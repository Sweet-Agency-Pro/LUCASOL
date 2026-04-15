import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn("mt-4 h-1 w-16 bg-primary rounded-full", centered && "mx-auto")} />
    </div>
  );
}
