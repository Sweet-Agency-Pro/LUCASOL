import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
        hover && "transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
