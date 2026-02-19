interface SkillGroupProps {
  category: string;
  items: string[];
}

export function SkillGroup({ category, items }: SkillGroupProps) {
  return (
    <div className="mb-4 break-inside-avoid">
      <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">{category}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-secondary-foreground/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
