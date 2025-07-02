import AdminGetLesson from "@/app/data/admin/admin-get-lesson";
import LessonForm from "@/components/dashboard/course/lesson/lesson-form";

type Params = Promise<{
  lessonId: string;
  courseId: string;
  chapterId: string;
}>;

const LessonPage = async ({ params }: { params: Params }) => {
  const { lessonId, courseId, chapterId } = await params;
  const lesson = await AdminGetLesson(lessonId);
  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
};
export default LessonPage;
