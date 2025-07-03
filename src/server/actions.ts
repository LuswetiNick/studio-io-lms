"use server";

import requireAdmin from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth, ErrorCode } from "@/lib/auth";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
  loginSchema,
  signUpSchema,
} from "@/lib/zod-schemas";
import { prisma } from "@/prisma/prisma";
import { request } from "@arcjet/next";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

// SignUp
export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.message,
    };
  }
  try {
    await auth.api.signUpEmail({
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });
    return {
      status: "success",
      message: "Registration successful. You are all set!",
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return {
            status: "error",
            message: "User already exists",
          };
        case "INVALID_PASSWORD":
          return {
            status: "error",
            message: "Invalid password",
          };
        default:
          return {
            status: "error",
            message: err.message || "Registration failed",
          };
      }
    }
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};

// Login
export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.message,
    };
  }
  try {
    await auth.api.signInEmail({
      body: {
        email: values.email,
        password: values.password,
      },
    });
    return {
      status: "success",
      message: "Welcome back!",
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "INVALID_EMAIL_OR_PASSWORD":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return {
            status: "error",
            message: err.message || "Login failed",
          };
      }
    }
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};

// Create Course
export const createCourse = async (
  values: CourseSchemaType
): Promise<ApiResponse> => {
  const session = await requireAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id as string,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Blocked! Rate limit exceeded",
        };
      } else {
        return {
          status: "error",
          message: "You seem like a malicious user. Please contact support.",
        };
      }
    }
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
};

// Edit Course
export const editCourse = async (
  values: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> => {
  const user = await requireAdmin();
  try {
    const req = await request();

    const decision = await aj.protect(req, {
      fingerprint: user.user.id as string,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Blocked! Rate limit exceeded",
        };
      } else {
        return {
          status: "error",
          message: "You seem like a malicious user. Please contact support.",
        };
      }
    }
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...validation.data,
      },
    });

    return {
      status: "success",
      message: "Course edited successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to edit course",
    };
  }
};

// Reorder Lessons
export const reorderLessons = async (
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "Lessons are required for re-ordering",
      };
    }
    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );
    await prisma.$transaction(updates);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder lessons",
    };
  }
};

// Reorder Chapters
export const reorderChapters = async (
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "Chapters are required for re-ordering",
      };
    }
    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );
    await prisma.$transaction(updates);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapters reordered successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder chapters",
    };
  }
};

// Create Chapter
export const createChapter = async (
  values: ChapterSchemaType
): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    const validation = chapterSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId: validation.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.chapter.create({
        data: {
          title: validation.data.name,
          courseId: validation.data.courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${validation.data.courseId}/edit`);
    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
};
// Create Lesson
export const createLesson = async (
  values: LessonSchemaType
): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    const validation = lessonSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId: validation.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.lesson.create({
        data: {
          title: validation.data.name,
          description: validation.data.description,
          videoKey: validation.data.videoKey,
          thumbnailKey: validation.data.thumbnailKey,
          chapterId: validation.data.chapterId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${validation.data.courseId}/edit`);
    return {
      status: "success",
      message: "Lesson created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create lesson",
    };
  }
};
// Delete Lesson
export const deleteLesson = async ({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        lessons: {
          orderBy: {
            position: "desc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });

    if (!chapterWithLessons) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }
    const lessons = chapterWithLessons.lessons;
    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);
    if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }
    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    const updates = remainingLessons.map((lesson, index) => {
      return prisma.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await prisma.$transaction([
      ...updates,
      prisma.lesson.delete({
        where: {
          id: lessonId,
          chapterId: chapterId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Lesson deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
};
// Delete Chapter
export const deleteChapter = async ({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    const courseWithChapters = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        chapter: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });

    if (!courseWithChapters) {
      return {
        status: "error",
        message: "Course not found",
      };
    }
    const chapters = courseWithChapters.chapter;
    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );
    if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }
    const remainingChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );
    const updates = remainingChapters.map((chapter, index) => {
      return prisma.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await prisma.$transaction([
      ...updates,
      prisma.chapter.delete({
        where: {
          id: chapterId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete chapter. Please delete the lesson(s) first.",
    };
  }
};

// update Lesson
export async function updateLesson(
  values: LessonSchemaType,
  lessonId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    const validation = lessonSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }
    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: validation.data.name,
        description: validation.data.description,
        videoKey: validation.data.videoKey,
        thumbnailKey: validation.data.thumbnailKey,
      },
    });
    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
}

// Delete Course
export const deleteCourse = async ({
  courseId,
}: {
  courseId: string;
}): Promise<ApiResponse> => {
  await requireAdmin();
  try {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    revalidatePath(`/admin/courses`);
    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete course",
    };
  }
};
