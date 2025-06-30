import { prisma } from "@/prisma/prisma";
import requireAdmin from "./require-admin";

export async function adminGetCourses() {
  await requireAdmin();

  const data = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      subDescription: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      category: true,
      fileKey: true,
      createdAt: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];
