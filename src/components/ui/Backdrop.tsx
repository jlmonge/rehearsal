import { ReactNode } from "react";
import { cn } from "../../utils/cn";

function Backdrop({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("fixed inset-0 bg-gray-950 bg-opacity-50 z-50", className)}
    >
      {children}
    </div>
  );
}

export default Backdrop;
