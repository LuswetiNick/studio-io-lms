import { getLessonContent } from "@/app/data/course/get-lesson-content";
import CourseContent from "./_components/course-content";
import { Suspense } from "react";
import LessonSkeleton from "./_components/lesson-skeleton";

type Params = Promise<{ lessonId: string }>;

const LessonPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};
export default LessonPage;

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const data = await getLessonContent(lessonId);
  return <CourseContent data={data} />;
}
