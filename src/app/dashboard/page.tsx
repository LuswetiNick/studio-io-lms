import EmptyState from "@/components/empty-state";
import PublicCourseCard from "@/components/home/public-course-card";
import requireUser from "@/hooks/require-user";
import { redirect } from "next/navigation";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import EnrolledCourseCard from "./_components/course-progress-card";

const UserDashboard = async () => {
  const session = await requireUser();
  if (session.user.role === "admin") {
    return redirect("/admin");
  }

  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <div className=" p-4 md:px-8 w-full flex flex-col">
      <div className="items-start justify-between gap-x-4 py-4 border-b">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold">
            Enrolled Courses : {enrolledCourses.length}
          </h1>
        </div>
      </div>
      <div>
        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Enrolled Courses"
            description="You have not enrolled in any courses yet."
            buttonLabel="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="my-4">
            {enrolledCourses.map((course) => (
              <EnrolledCourseCard key={course.course.id} data={course} />
            ))}
          </div>
        )}
      </div>
      <section className="mt-10">
        <div className="items-start justify-between gap-x-4 py-4 border-b">
          <div className="max-w-xl">
            <h3 className=" text-2xl font-bold">Available Courses</h3>
            <p className="text-muted-foreground mt-2">
              Discover a wide range of courses covering various topics and skill
              levels.
            </p>
          </div>
        </div>
        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No Available Courses"
            description="You have purchased all available courses."
            buttonLabel="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} course={course} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default UserDashboard;
