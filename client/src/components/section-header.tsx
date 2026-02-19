import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionHeader({ title, className, icon }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4 pb-2 border-b-2 border-primary/10", className)}>
      {icon && <div className="text-primary/80">{icon}</div>}
      <h2 className="text-xl font-bold uppercase tracking-wider text-primary">{title}</h2>
    </div>
  );
}
