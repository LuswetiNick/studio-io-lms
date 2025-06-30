import "server-only";
import requireAdmin from "./require-admin";
import { prisma } from "@/prisma/prisma";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
  await requireAdmin();

  const course = await prisma.course.findUnique({
    where: {
      id,
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
    },
  });

  if (!course) {
    throw notFound();
  }

  return course;
}
