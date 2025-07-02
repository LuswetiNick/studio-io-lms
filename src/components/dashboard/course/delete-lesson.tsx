"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { deleteLesson } from "@/server/actions";
import { Loader, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
const DeleteLesson = ({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson({
          chapterId,
          courseId,
          lessonId,
        })
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            lesson.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={handleDelete}
            >
              {pending ? <Loader className="size-4 animate-spin" /> : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteLesson;
