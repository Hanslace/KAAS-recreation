import InfoCell from '../ui/InfoCell';



export default function InfoGrid({
  fields,
  heading,
}) {
  return (
    <div>
      {heading && (
        <h2 className="mb-2 main-heading font-bold tracking-tight text-black">
          {heading}
        </h2>
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