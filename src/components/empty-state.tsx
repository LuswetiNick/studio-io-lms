import { BookAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonLabel?: string;
  href?: string;
}

const EmptyState = ({
  title,
  description,
  buttonLabel,
  href,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center animate-in fade-in-60">
      <div className="flex items-center justify-center size-24 rounded-full bg-primary/10">
        <BookAlert className="size-12 text-primary" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {buttonLabel && href && (
        <Button className="mt-6" asChild>
          <Link href={href}>{buttonLabel}</Link>
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
