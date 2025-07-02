"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loader, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { chapterSchema, ChapterSchemaType } from "@/lib/zod-schemas";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createChapter } from "@/server/actions";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";

const NewChapterModal = ({ courseId }: { courseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // hanlde openChange
  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  }
  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
    },
  });

  async function onSubmit(values: ChapterSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createChapter(values));
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
        <Button variant="outline" size="sm">
          <Plus className="size-4" />
          New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chapter</DialogTitle>
          <DialogDescription>
            What would you like to name this chapter?
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
                    <Input placeholder="Chapter Name" {...field} />
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
export default NewChapterModal;
