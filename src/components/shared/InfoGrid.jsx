import InfoCell from '../ui/InfoCell';

type DetailField = {
  label: string;
  value: string;
};

interface InfoGridProps {
  fields: DetailField[];
  heading?: string;
}

export default function InfoGrid({
  fields,
  heading,
}: InfoGridProps) {
  return (
    <div>
      {heading && (
        <h2 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-2 gap-5 md:gap-x-10 sm:grid-cols-2 md:grid-cols-4">
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