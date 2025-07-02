"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zod-schemas";
import { createLesson } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NewLessonModal = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // hanlde openChange
  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  }
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId: chapterId,
    },
  });

  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="size-4" />
          New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Lesson</DialogTitle>
          <DialogDescription>
            What would you like to name this lesson?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lesson Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={pending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={pending}>
                {pending ? <Loader className="size-4 animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default NewLessonModal;
