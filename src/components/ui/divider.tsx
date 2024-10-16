import { cn } from "@/lib/utils";

const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-transparent via-main dark:via-neutral-700 to-transparent my-8 h-[1px] w-full",
        className
      )}
    />
  );
};
export default Divider;
