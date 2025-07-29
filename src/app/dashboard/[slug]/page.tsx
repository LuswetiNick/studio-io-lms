import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar";
import EmptyState from "@/components/empty-state";
import { redirect } from "next/navigation";

interface CourseSlugProps {
  params: Promise<{ slug: string }>;
}

const CourseSlug = async ({ params }: CourseSlugProps) => {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);
  const firstChapter = course.course.chapter[0];
  const firstLesson = firstChapter.lessons[0];
  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className="flex items-center h-full text-center">
      <EmptyState
        title="No lessons available"
        description="Once the lessons are added, they will appear here."
      />
    </div>
  );
};
export default CourseSlug;
