import "server-only";
import requireUser from "../user/require-user";
import { prisma } from "@/prisma/prisma";
import { notFound } from "next/navigation";
export async function getCourseSidebarData(slug: string) {
  const session = await requireUser();
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      subDescription: true,
      description: true,
      fileKey: true,
      slug: true,
      level: true,
      category: true,
      chapter: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: session.user.id,
                },
                select: {
                  completed: true,
                  lessonId: true,
                  id: true,
                },
              },
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!course) {
    return notFound();
  }
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      },
    },
  });
  if (!enrollment || enrollment.status !== "Completed") {
    return notFound();
  }
  return {
    course,
  };
}
export type getCourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;
