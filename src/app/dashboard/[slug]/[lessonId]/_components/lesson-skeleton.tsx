import { Skeleton } from "@/components/ui/skeleton";

const LessonSkeleton = () => {
  return (
    <div className="h-full p-4 flex flex-col">
      <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 space-y-4 mt-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-8 w-1/2 rounded-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-5/6 rounded-md" />
          <Skeleton className="h-8 w-4/6 rounded-md" />
        </div>
      </div>
    </div>
  );
};
export default LessonSkeleton;
