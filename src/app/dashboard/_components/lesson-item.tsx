import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };

  slug: string;
  isActive?: boolean;
  completed: boolean;
}

const LessonItem = ({ lesson, slug, isActive, completed }: LessonItemProps) => {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full p-2 h-auto justify-start transition-all duration-200 tracking-tight truncate",
          completed
            ? "bg-primary border-primary"
            : isActive
            ? "text-primary border-primary"
            : " text-foreground",
          isActive && !completed && "bg-primary/10 hover:bg-primary/20"
        ),
      })}
    >
      {completed && <Check className="size-4 text-primary" />}
      {lesson.title}
    </Link>
  );
};
export default LessonItem;
