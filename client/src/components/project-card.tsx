import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  technologies: string;
  description: string[];
}

export function ProjectCard({ title, technologies, description }: ProjectCardProps) {
  return (
    <div className="mb-6 last:mb-0 break-inside-avoid bg-gray-50/50 p-4 rounded-lg border border-gray-100">
      <div className="flex flex-col mb-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="text-sm text-primary/70 font-mono mt-1 mb-2">
          {technologies}
        </div>
      </div>
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
