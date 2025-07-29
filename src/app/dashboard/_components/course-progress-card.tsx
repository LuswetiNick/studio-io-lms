/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface EnrolledCourseCardProps {
  data: EnrolledCourseType;
}

const EnrolledCourseCard = ({ data }: EnrolledCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(data.course.fileKey);
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.course as any });
  return (
    <Card className="group relative overflow-hidden py-0 gap-0 w-full max-w-sm ">
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt={data.course.title}
          width={600}
          height={500}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className=" py-4 space-y-4">
        <Badge variant="secondary" className="text-xs">
          {data.course.category}
        </Badge>
        <div className="space-y-2">
          <p className="font-semibold text-lg line-clamp-2 leading-tight">
            {data.course.title}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.course.subDescription}
          </p>
        </div>
        <div className="w-full space-y-2">
          <div className="w-full flex items-center justify-between">
            <p className=" text-sm text-muted-foreground">Progress</p>
            <p className="text-sm text-muted-foreground">
              {progressPercentage}% |{" "}
              <span className="text-sm text-muted-foreground">
                {completedLessons}/{totalLessons} lessons
              </span>
            </p>
          </div>
          <Progress value={progressPercentage} />
        </div>
      </CardContent>
      <CardFooter className="mb-4">
        <Button asChild className="w-full">
          <Link href={`/dashboard/${data.course.slug}`}>Go to Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default EnrolledCourseCard;

export function EnrolledCourseCardSkeleton() {
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
