import { prisma } from "@/prisma/prisma";
import { notFound } from "next/navigation";

export async function getSingleCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      subDescription: true,
      description: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      category: true,
      fileKey: true,
      createdAt: true,
      slug: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    throw notFound();
  }

  return course;
}
