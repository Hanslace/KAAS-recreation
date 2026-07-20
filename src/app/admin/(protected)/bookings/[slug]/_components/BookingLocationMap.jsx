'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

let googleMapsPromise = null;

function loadGoogleMaps(apiKey) {
  if (typeof window === 'undefined') {
    return Promise.reject(
      new Error('Google Maps can only load in the browser.')
    );
  }

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve(window.google);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[data-google-maps-script]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        resolve(window.google);
      });

      existingScript.addEventListener('error', () => {
        reject(new Error('Failed to load Google Maps.'));
      });

      return;
    }

    const callbackName = `initGoogleMaps_${Date.now()}`;

    window[callbackName] = () => {
      delete window[callbackName];
      resolve(window.google);
    };

    const script = document.createElement('script');

    script.dataset.googleMapsScript = 'true';
    script.async = true;
    script.defer = true;

    script.src =
      `https://maps.googleapis.com/maps/api/js` +
      `?key=${encodeURIComponent(apiKey)}` +
      `&loading=async` +
      `&libraries=maps,marker` +
      `&callback=${callbackName}`;

    script.onerror = () => {
      delete window[callbackName];
      googleMapsPromise = null;

      reject(new Error('Failed to load Google Maps.'));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

function extractCoordinatesFromUrl(locationUrl) {
  if (!locationUrl) return null;

  let decodedUrl = locationUrl;

  try {
    decodedUrl = decodeURIComponent(locationUrl);
  } catch {
    // Keep the original URL when decoding fails.
  }

  // Example:
  // https://www.google.com/maps/@31.5204,74.3587,15z
  const pathCoordinates = decodedUrl.match(
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/
  );

  if (pathCoordinates) {
    return {
      lat: Number(pathCoordinates[1]),
      lng: Number(pathCoordinates[2]),
    };
  }

  try {
    const url = new URL(locationUrl);

    const coordinateParameters = [
      'q',
      'query',
      'destination',
      'll',
    ];

    for (const parameter of coordinateParameters) {
      const value = url.searchParams.get(parameter);

      if (!value) continue;

      const coordinateMatch = value.match(
        /(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/
      );

      if (coordinateMatch) {
        return {
          lat: Number(coordinateMatch[1]),
          lng: Number(coordinateMatch[2]),
        };
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function BookingLocationMap({
  latitude,
  longitude,
  locationUrl,
  title = 'Booking location',
  zoom = 15,
}) {
  const mapContainerRef = useRef(null);
  const [error, setError] = useState('');

  const coordinates = useMemo(() => {
    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    if (
      Number.isFinite(parsedLatitude) &&
      Number.isFinite(parsedLongitude)
    ) {
      return {
        lat: parsedLatitude,
        lng: parsedLongitude,
      };
    }

    return extractCoordinatesFromUrl(locationUrl);
  }, [latitude, longitude, locationUrl]);

  useEffect(() => {
    if (!coordinates || !mapContainerRef.current) {
      return;
    }

    const apiKey =
            import.meta.env.VITE_GOOGLE_MAPS_DEMO_KEY;

    if (!apiKey) {
      setError('Google Maps Demo Key is missing.');
      return;
    }

    let marker = null;
    let cancelled = false;

    async function initializeMap() {
      try {
        setError('');

        await loadGoogleMaps(apiKey);

        if (cancelled || !mapContainerRef.current) {
          return;
        }

        const { Map } =
          await window.google.maps.importLibrary('maps');

        const { AdvancedMarkerElement } =
          await window.google.maps.importLibrary('marker');

        if (cancelled) return;

        const map = new Map(mapContainerRef.current, {
          center: coordinates,
          zoom,
          mapId: 'DEMO_MAP_ID',
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });

        marker = new AdvancedMarkerElement({
          map,
          position: coordinates,
          title,
        });
      } catch (mapError) {
        console.error(mapError);

        if (!cancelled) {
          setError('Unable to load the booking location.');
        }
      }
    }

    initializeMap();

    return () => {
      cancelled = true;

      if (marker) {
        marker.map = null;
      }
    };
  }, [coordinates, title, zoom]);

    if (!coordinates) {
    return (
        <div className="flex aspect-square w-full  self-start items-center justify-center rounded-2xl bg-black/5 px-6 text-center text-sm text-black/50">
        Valid booking coordinates were not provided.
        </div>
    );
    }

    return (
    <div className="relative aspect-square w-full  self-start overflow-hidden rounded-2xl bg-black/5">
        <div
        ref={mapContainerRef}
        className="absolute inset-0"
        aria-label={title}
        />

        {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white px-6 text-center text-sm text-red-500">
            {error}
        </div>
        )}
    </div>
    );
}