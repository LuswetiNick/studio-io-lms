import { AdminCourseType } from "@/app/data/admin/get-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  ArrowRight,
  Building2,
  Clock,
  EllipsisVertical,
  Eye,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteCourse from "./delete-course";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminCourseCardProps {
  course: AdminCourseType;
}

const AdminCourseCard = ({ course }: AdminCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(course.fileKey);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
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
        <Badge
          className={`absolute top-2 left-2 z-10 ${getStatusColor(
            course.status
          )} capitalize`}
          variant="outline"
        >
          {course.status}
        </Badge>
        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Pencil className="size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/courses/${course.slug}`}>
                  <Eye className="size-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DeleteCourse courseId={course.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>{" "}
      </div>
      <CardContent className="p-4 space-y-3">
        <Badge variant="secondary" className="text-xs">
          {course.category}
        </Badge>
        <div className="space-y-2">
          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="font-semibold text-lg line-clamp-2 leading-tight hover:underline group-hover:text-primary transition-colors"
          >
            {course.title}
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.subDescription}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">
              {course.duration} hrs
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">
              {course.level}
            </span>
          </div>
        </div>
        <Button className="w-full" asChild>
          <Link href={`/admin/courses/${course.id}/edit`}>
            Edit Course
            <ArrowRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default AdminCourseCard;

export function AdminCourseCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden py-0 gap-0 w-full max-w-sm mx-auto">
      <div className="relative">
        <Skeleton className="w-full h-48" />
        {/* Status badge skeleton */}
        <div className="absolute top-2 left-2 z-10">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        {/* Dropdown menu skeleton */}
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
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

        {/* Duration and level skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
