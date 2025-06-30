import { adminGetCourses } from "@/app/data/admin/get-courses";
import AdminCourseCard from "@/components/dashboard/course/admin-course-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const CoursesPage = async () => {
  const data = await adminGetCourses();
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
      <div className="items-start justify-between py-4 border-b flex">
        <div>
          <h3 className="text-2xl font-bold">Your Courses</h3>
        </div>

        <Button asChild>
          <Link href="/creator-dashboard/courses/create">
            <Plus /> Create
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {data.map((course) => (
          <AdminCourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
export default CoursesPage;
