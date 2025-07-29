"use server";

import requireUser from "@/app/data/user/require-user";
import { ApiResponse } from "@/lib/types";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function MarkLessonComplete(
  lessonId: string,
  slug: string
): Promise<ApiResponse> {
  const session = await requireUser();
  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: session.user.id,
        lessonId: lessonId,
        completed: true,
      },
    });
    revalidatePath(`/dashboard/${slug}`);
    return {
      status: "success",
      message: "Progress Updated.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to mark lesson as complete",
    };
  }
}
