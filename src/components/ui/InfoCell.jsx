

export default function InfoCell({ label, value }) {
  return (
    <div className="info-cell pb-3 px-[0.5rem] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-100">
      <p className="tracking-tight text-black font-bold">
        {label}
      </p>
      <p className="break-words tracking-tight text-brand ">
        {value}
      </p>
    </div>
  );
}