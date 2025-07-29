import { getAllCourses } from "@/app/data/course/get-all-courses";
import PublicCourseCard, {
  PublicCourseCardSkeleton,
} from "@/components/home/public-course-card";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ExploreCoursesPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
      <div className="items-start justify-between gap-x-4 py-4 border-b">
        <div className="max-w-xl">
          <h3 className=" text-2xl font-bold">Explore Courses</h3>
          <p className="text-muted-foreground mt-2">
            Discover a wide range of courses covering various topics and skill
            levels.
          </p>
        </div>
      </div>
      <Suspense fallback={<PublicCoursesSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};
export default ExploreCoursesPage;

async function RenderCourses() {
  const courses = await getAllCourses();
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
function PublicCoursesSkeletonLayout() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
