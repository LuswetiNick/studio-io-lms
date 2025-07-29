"use client";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/render-description";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { CheckCircle, VideoOff } from "lucide-react";
import { useTransition } from "react";
import { MarkLessonComplete } from "../actions";
import { toast } from "sonner";

interface CourseContentProps {
  data: LessonContentType;
}

const CourseContent = ({ data }: CourseContentProps) => {
  const [loading, startTransition] = useTransition();

  function onComplete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        MarkLessonComplete(data.id, data.chapter.course.slug)
      );
      if (error) {
        toast.error("Something went wrong");
        return;
      }
      if (result.status === "success") {
        toast.success("Lesson completed");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);
    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <VideoOff className="size-16 text-primary mx-auto mb-4" />
          <p className="text-sm">This lesson does not have a video yet</p>
        </div>
      );
    }
    return (
      <div className="aspect-video bg-background rounded-md relative overflow-hidden">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          poster={thumbnailUrl}
        />
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full bg-background p-4 space-y-4">
      {/* <h1>{data.title}</h1> */}
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button variant="default">
            <CheckCircle className="size-4 " />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onComplete} disabled={loading}>
            <CheckCircle className="size-4 " />
            Mark as Complete
          </Button>
        )}
      </div>
      <div>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </section>
  );
};
export default CourseContent;
