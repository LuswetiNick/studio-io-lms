"use client";

import Uploader from "@/components/file-upload/uploader";
import RichTextEditor from "@/components/rich-text-editor/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zod-schemas";
import { editCourse } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, WandSparkles } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import slugify from "slugify";
import { toast } from "sonner";
import { AdminCourseSingleType } from "@/app/data/admin/admin-get-course";

interface EditCourseFormProps {
  data: AdminCourseSingleType;
}

const EditCourseForm = ({ data }: EditCourseFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      subDescription: data.subDescription,
      price: data.price,
      duration: data.duration,
      level: data.level,
      status: data.status,
      category: data.category as CourseSchemaType["category"],
      slug: data.slug,
      fileKey: data.fileKey,
    },
  });
  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id)
      );
      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end gap-4">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="w-fit"
            onClick={() => {
              const titleValue = form.getValues("title");
              if (!titleValue || titleValue.trim() === "") {
                toast.error("Please enter a title first");
                return;
              }
              const slugValue = slugify(titleValue);
              form.setValue("slug", slugValue, {
                shouldValidate: true,
              });
              toast.success("Slug generated successfully");
            }}
          >
            <WandSparkles className="size-4 " /> Generate Slug
          </Button>
        </div>
        <FormField
          control={form.control}
          name="subDescription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sub Description</FormLabel>
              <FormControl>
                <Textarea className="min-h-[100px] resize-none" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Duration(hours)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Uploader
                  value={field.value}
                  onChange={field.onChange}
                  fileTypeAccepted="image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            "Update Course"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default EditCourseForm;
