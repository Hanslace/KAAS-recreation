import { ReactNode } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';




function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  return 'N/A';
}

export default function VehicleCard({
  vehicle,
  basePath,
  fields,
  className = '',
}) {
  const cleanBasePath =
    basePath.length > 1 && basePath.endsWith('/')
      ? basePath.slice(0, -1)
      : basePath;

  return (
    <Link
      to={`${cleanBasePath}/${vehicle.slug}`}
      className="block w-full focus:outline-none vehicle-card"
      aria-label={`View vehicle details for ${vehicle.name}`}
    >
      <div
        className={twMerge(
          'flex w-full flex-col rounded-[15px] border border-gray-100 bg-white p-2 pb-5 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl ',
          className,
        )}
      >
        <div className="group relative aspect-[9/5] shrink-0 overflow-hidden rounded-2xl bg-gray-900">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="h-full w-full object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-col space-y-1 text-left">
          <h3 className="truncate heading font-bold leading-tight tracking-tight text-gray-900 ">
            {vehicle.name}
          </h3>

          <div className="space-y-1.5 pt-1  font-medium ">
            {fields.map((field) => {
              const value = vehicle[field.accessKey];

              return (
                <div
                  key={String(field.accessKey)}
                  className="break-words"
                >
                  <span className="font-bold text-gray-900">
                    {field.label}:{' '}
                  </span>

                  <span className="font-normal text-gray-500">
                    {field.render
                      ? field.render(value, vehicle)
                      : displayValue(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}