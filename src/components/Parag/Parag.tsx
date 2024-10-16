import { cn } from "@/lib/utils";

const Parag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn("leading-relaxed text-gray-500/85", className)}>
    {children}
  </p>
);
export default Parag;
