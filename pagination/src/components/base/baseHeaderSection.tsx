interface HeaderSectionProps {
  title: string;
  description: string;
}

export default function BaseHeaderSection({ title, description }: HeaderSectionProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
