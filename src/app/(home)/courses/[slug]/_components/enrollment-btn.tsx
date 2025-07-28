"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function EnrollmentBtn({ courseId }: { courseId: string }) {
  const [loading, startTransition] = useTransition();
  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );
      if (error) {
        toast.error("An unknown error occurred. Please try again later.");
        return;
      }
      if (result?.status === "success") {
        toast.success("You have enrolled in the course!");
      } else if (result?.status === "error") {
        toast.info(result.message);
      }
    });
  }
  return (
    <Button className="w-full" disabled={loading} onClick={onSubmit}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : "Enroll Now!"}
    </Button>
  );
}
