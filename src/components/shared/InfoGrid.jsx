import { useNavigate } from 'react-router';
import InfoCell from '../ui/InfoCell';
import EditButton from '../ui/EditButton';



export default function InfoGrid({
  fields,
  heading,
  editHref,
}) {
  const navigate = useNavigate();

  return (
    <div>
      {(heading || editHref) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {heading && (
            <h2 className="main-heading font-bold tracking-tight text-black">
              {heading}
            </h2>
          )}

          {editHref && (
            <EditButton onEdit={() => navigate(editHref)} label="info" />
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 gap-x-4 sm:grid-cols-2 md:grid-cols-4">
        {fields.map((field) => (
          <InfoCell
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </div>
    </div>
  );
}