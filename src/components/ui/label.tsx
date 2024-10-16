import { cn } from "@/lib/utils";

const Label = ({
  id,
  label,
  className,
}: {
  id?: string;
  label: string;
  className?: string;
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "mb-2 block text-sm font-bold leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
        className
      )}
    >
      {label}
    </label>
  );
};
export default Label;
