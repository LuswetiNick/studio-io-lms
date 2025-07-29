"use client";
import { getCourseSidebarDataType } from "@/app/data/course/get-course-sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import LessonItem from "./lesson-item";
import { useCourseProgress } from "@/hooks/use-course-progress";

interface CourseSidebarProps {
  course: getCourseSidebarDataType["course"];
}

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const pathname = usePathname();
  const currentLessonId = pathname.split("/").pop();
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: course });
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Play className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm leading-tight ">{course.title}</h3>
          </div>
        </div>
        <div className="space-y-2 w-full m-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
            <span>progress</span>
            <span>
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
            <span>{progressPercentage}%</span>
            <span>complete</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {course.chapter.map((chapter) => (
          <Collapsible key={chapter.id}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-auto flex items-center gap-2"
              >
                <div className="shrink-0">
                  <ChevronDown className="size-4 text-primary" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold truncate text-sm">
                    {chapter.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium truncate">
                    {chapter.lessons.length} lessons
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-4 space-y-4">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                  isActive={currentLessonId === lesson.id}
                  completed={
                    lesson.lessonProgress.find(
                      (progress) => progress.lessonId === lesson.id
                    )?.completed || false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};
export default CourseSidebar;
