import { prisma } from "@/prisma/prisma";

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "published",
    },
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

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
