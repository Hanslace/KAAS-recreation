interface InfoCellProps {
  label: string;
  value: string;
}

export default function InfoCell({ label, value }: InfoCellProps) {
  return (
    <div className="py-[1.5rem] px-[0.5rem] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-100">
      <p className="tracking-tight text-black font-bold">
        {label}
      </p>
      <p className="tracking-tight text-brand">
        {value}
      </p>
    </div>
  );
}