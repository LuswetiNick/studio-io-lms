import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Button } from "../ui/button";
import Link from "next/link";
import { Clock, Building2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface PublicCourseCardProps {
  course: PublicCourseType;
}

const PublicCourseCard = ({ course }: PublicCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(course.fileKey);
  return (
    <Card className="group relative overflow-hidden py-0 gap-0 w-full max-w-sm mx-auto">
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt={course.title}
          width={600}
          height={500}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className=" py-4 space-y-4">
        <Badge variant="secondary" className="text-xs">
          {course.category}
        </Badge>
        <div className="space-y-2">
          <p className="font-semibold text-lg line-clamp-2 leading-tight">
            {course.title}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.subDescription}
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-4 text-primary" /> {course.duration} hrs
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="size-4 text-primary" /> {course.level}
            </p>
          </div>
          <p className="text-sm font-semibold">KES {course.price}</p>
        </div>
      </CardContent>
      <CardFooter className="mb-4">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default PublicCourseCard;

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden py-0 gap-0 w-full max-w-sm mx-auto">
      <div className="relative">
        <Skeleton className="w-full h-48" />
      </div>
      <CardContent className="py-4 space-y-4">
        {/* Category badge skeleton */}
        <Skeleton className="h-5 w-16 rounded-full" />

        <div className="space-y-2">
          {/* Title skeleton */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />

          {/* Description skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Duration, level and price skeleton */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          {/* Price skeleton */}
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="mb-4">
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
