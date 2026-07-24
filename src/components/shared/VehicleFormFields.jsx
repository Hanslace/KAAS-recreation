'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import UploadArea from '@/components/ui/UploadArea';
import AttachmentImage from '@/components/ui/AttachmentImage';

const ATTACHMENTS_LIMIT = 3;

export default function VehicleFormFields({
  register,
  errors = {},
  fieldName = (key) => key,
  onFilesChange,
}) {
  const role = import.meta.env.VITE_APP_ROLE ?? 'admin';
  const isPilotCar = role.startsWith('pilot-car');
  const vehicleLabel = isPilotCar ? 'Pilot Car' : 'Truck';

  const [photo, setPhoto] = useState(null);
  const [liabilityDoc, setLiabilityDoc] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [attachmentError, setAttachmentError] = useState('');

  useEffect(() => {
    onFilesChange?.(
      isPilotCar ? { photo: null, attachments } : { photo, liability: liabilityDoc }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, liabilityDoc, attachments]);

  const handlePhotoSelect = (file) => {
    if (!file) return;
    setPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const removePhoto = () => {
    if (photo?.url) URL.revokeObjectURL(photo.url);
    setPhoto(null);
  };

  const handleLiabilitySelect = (file) => {
    if (!file) return;
    setLiabilityDoc({ url: URL.createObjectURL(file), name: file.name });
  };

  const removeLiabilityDoc = () => {
    if (liabilityDoc?.url) URL.revokeObjectURL(liabilityDoc.url);
    setLiabilityDoc(null);
  };

  const addAttachment = (file) => {
    if (!file) return;
    setAttachments((previous) => {
      if (previous.length >= ATTACHMENTS_LIMIT) {
        setAttachmentError(`You can only upload ${ATTACHMENTS_LIMIT} attachments`);
        return previous;
      }
      setAttachmentError('');
      return [
        ...previous,
        { attachmentId: crypto.randomUUID(), url: URL.createObjectURL(file), name: file.name },
      ];
    });
  };

  const removeAttachment = (attachmentId) => () => {
    setAttachments((previous) => {
      const doc = previous.find((item) => item.attachmentId === attachmentId);
      if (doc?.url) URL.revokeObjectURL(doc.url);
      return previous.filter((item) => item.attachmentId !== attachmentId);
    });
    setAttachmentError('');
  };

  return (
    <>
      {!isPilotCar && (
        <>
          <UploadArea label={`Upload ${vehicleLabel} Photo`} onFileSelect={handlePhotoSelect} />
          {photo && (
            <AttachmentImage src={photo.url} alt={photo.name} onRemove={removePhoto} />
          )}
        </>
      )}

      <Input
        label={`${vehicleLabel} Name`}
        placeholder={`Enter ${vehicleLabel} Name`}
        type="text"
        error={errors.name?.message}
        {...register(fieldName('name'))}
      />

      {!isPilotCar && (
        <Input
          label="MC Number"
          placeholder="Enter MC Number"
          type="number"
          inputMode="numeric"
          error={errors.mcNumber?.message}
          {...register(fieldName('mcNumber'))}
        />
      )}

      <Input
        label="DOT Number"
        placeholder="Enter DOT Number"
        type="number"
        inputMode="numeric"
        error={errors.dotNumber?.message}
        {...register(fieldName('dotNumber'))}
      />

      <Input
        label="License Plate Number"
        placeholder="Enter License Plate Number"
        type="text"
        error={errors.licensePlate?.message}
        {...register(fieldName('licensePlate'))}
      />

      <Input
        label="Registration Number"
        placeholder="Enter Registration Number"
        type="text"
        error={errors.registrationNumber?.message}
        {...register(fieldName('registrationNumber'))}
      />

      <Input
        label="VIN Number"
        placeholder="Enter VIN Number"
        type="text"
        error={errors.vinNumber?.message}
        {...register(fieldName('vinNumber'))}
      />

      <span className="font-bold auth-h2 tracking-tight text-black">
        {isPilotCar ? 'Attachments' : 'Liability'}
      </span>

      {isPilotCar ? (
        <>
          <UploadArea label="Upload Pilot Car Photos" iconPosition="left" onFileSelect={addAttachment} />

          {attachmentError && (
            <p className="text-red-500 px-4 font-medium transition-all duration-200">
              {attachmentError}
            </p>
          )}

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {attachments.map((attachment) => (
                <AttachmentImage
                  key={attachment.attachmentId}
                  src={attachment.url}
                  alt={attachment.name}
                  onRemove={removeAttachment(attachment.attachmentId)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <UploadArea
            label="Upload Liability Document"
            iconPosition="left"
            onFileSelect={handleLiabilitySelect}
          />
          {liabilityDoc && (
            <AttachmentImage
              src={liabilityDoc.url}
              alt={liabilityDoc.name}
              onRemove={removeLiabilityDoc}
            />
          )}
        </>
      )}
    </>
  );
}
