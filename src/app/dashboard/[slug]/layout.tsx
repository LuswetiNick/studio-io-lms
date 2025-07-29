import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar";
import CourseSidebar from "../_components/course-siderbar";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CourseLayout = async ({ children, params }: CourseLayoutProps) => {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);
  return (
    <section className="flex flex-1">
      {/* sidebar */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={course.course} />
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </section>
  );
};
export default CourseLayout;
