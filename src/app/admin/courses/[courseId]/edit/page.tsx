import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import CourseContentForm from "@/components/dashboard/course/course-content-form";
import EditCourseForm from "@/components/dashboard/course/edit-course-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Params = Promise<{ courseId: string }>;

const EditRoute = async ({ params }: { params: Params }) => {
  const { courseId } = await params;
  const course = await adminGetCourse(courseId);
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
      <h1 className="my-6">
        Edit Course: <strong className="text-primary">{course.title}</strong>
      </h1>
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="course-content">Course Content</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Fill in the basic information for your course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={course} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-content">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                Update the content for your course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseContentForm data={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default EditRoute;
