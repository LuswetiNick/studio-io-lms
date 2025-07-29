import "server-only";
import requireUser from "./require-user";
import { prisma } from "@/prisma/prisma";

export async function getEnrolledCourses() {
  const user = await requireUser();
  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.user.id,
      status: "Completed",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          subDescription: true,
          category: true,
          price: true,
          duration: true,
          fileKey: true,
          level: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return data;
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];
