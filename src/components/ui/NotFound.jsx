import { Icon } from "@iconify/react";



export default function NotFound({
  title = "Not Found",
  message = "The resource you are looking for does not exist or has been moved.",
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center animate-fade-in">
      {/* Visual Anchor Icon using Iconify */}
      <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400">
        <Icon icon="lucide:alert-circle" width="48" height="48" />
      </div>

      {/* Dynamic Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      {/* Dynamic Descriptive Message */}
      <p className="mt-2 max-w-md text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}
