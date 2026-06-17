import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge variant="outline" className="mb-4 border-primary/30 bg-white/5 text-primary backdrop-blur">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
