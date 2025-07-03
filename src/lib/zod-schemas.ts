import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

// Course Schema
export const courseLevels = ["beginner", "intermediate", "advanced"] as const;
export const courseStatus = ["draft", "published", "archived"] as const;
export const courseCategories = [
  "design",
  "business",
  "finance",
  "health",
  "music",
  "photography",
  "sports",
  "technology",
  "travel",
  "writing",
  "software",
  "marketing",
  "gaming",
  "cooking",
  "fitness",
] as const;
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(100, {
      message: "Title must be at most 100 characters long",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description is required",
    })
    .max(10000, {
      message: "Description must be at most 10000 characters long",
    }),
  subDescription: z
    .string()
    .min(3, {
      message: "Sub description is required",
    })
    .max(3000, {
      message: "Sub description must be at most 200 characters long",
    }),
  price: z.coerce.number().min(1, {
    message: "Price must be a positive number",
  }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be atleast 1 hour" })
    .max(500, { message: "Duration must be at most 500 hours" }),
  level: z.enum(courseLevels, { message: "Level is required" }),
  category: z.enum(courseCategories, { message: "Category is required" }),
  slug: z.string().min(3),
  status: z.enum(courseStatus, { message: "Status is required" }),
  fileKey: z.string().min(1, { message: "File key is required" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

// S3 Upload Schema
export const s3UploadSchema = z.object({
  fileName: z.string().min(1, { message: "File name is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "File size is required" }),
  isImage: z.boolean().default(false),
});

export type S3UploadSchemaType = z.infer<typeof s3UploadSchema>;

export const chapterSchema = z.object({
  name: z.string().min(3, {
    message: "Chapter name is required",
  }),
  courseId: z.string().uuid({
    message: "Course ID is required",
  }),
});

export type ChapterSchemaType = z.infer<typeof chapterSchema>;

export const lessonSchema = z.object({
  name: z.string().min(3, {
    message: "Lesson name is required",
  }),
  courseId: z.string().uuid({
    message: "Course ID is required",
  }),
  chapterId: z.string().uuid({
    message: "Chapter ID is required",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type LessonSchemaType = z.infer<typeof lessonSchema>;
