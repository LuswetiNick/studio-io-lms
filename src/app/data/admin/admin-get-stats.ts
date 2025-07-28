import { prisma } from "@/prisma/prisma";
import requireAdmin from "./require-admin";

export async function adminGetStats() {
  await requireAdmin();
  const [totalUsers, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Total Users
      prisma.user.count(),
      // Total customers
      prisma.user.count({ where: { enrollment: { some: {} } } }),
      // Total courses
      prisma.course.count(),
      // Total lessons
      prisma.lesson.count(),
    ]);
  return {
    totalUsers,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
