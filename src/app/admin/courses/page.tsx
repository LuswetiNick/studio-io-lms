import { adminGetCourses } from "@/app/data/admin/get-courses";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "@/components/dashboard/course/admin-course-card";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
      <div className="items-start justify-between py-4 border-b flex">
        <div>
          <h3 className="text-2xl font-bold">Your Courses</h3>
        </div>

        <Button asChild>
          <Link href="/admin/courses/create">
            <Plus className="size-4" /> Create Course
          </Link>
        </Button>
      </div>
      <Suspense fallback={<AdminCoursesSkeletonLayout />}>
        {RenderCourses()}
      </Suspense>
    </section>
  );
};
export default CoursesPage;

async function RenderCourses() {
  const data = await adminGetCourses();
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          description="You have no courses. Courses created will appear here"
          buttonLabel="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((course) => (
            <AdminCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}

function AdminCoursesSkeletonLayout() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
