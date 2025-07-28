import { prisma } from "@/prisma/prisma";
import requireAdmin from "./require-admin";

export async function adminGetEnrollments() {
  await requireAdmin();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const last30Days: { date: string; enrollments: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(thirtyDaysAgo);
    date.setDate(date.getDate() - i);

    last30Days.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });
  }
  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
    const day = last30Days.findIndex((day) => day.date === enrollmentDate);
    if (day !== -1) {
      last30Days[day].enrollments++;
    }
  });
  return last30Days;
}
