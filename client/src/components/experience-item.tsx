import { Badge } from "@/components/ui/badge";

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export function ExperienceItem({ role, company, period, description }: ExperienceItemProps) {
  return (
    <div className="mb-6 last:mb-0 break-inside-avoid">
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
        <h3 className="text-lg font-bold text-gray-900">{role}</h3>
        <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
          {period}
        </span>
      </div>
      <div className="text-base font-semibold text-primary/80 mb-2">{company}</div>
      <ul className="list-disc list-outside ml-4 space-y-1">
        {description.map((item, index) => (
          <li key={index} className="text-sm text-gray-600 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
