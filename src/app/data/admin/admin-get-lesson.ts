import { prisma } from "@/prisma/prisma";
import requireAdmin from "./require-admin";
import { notFound } from "next/navigation";

const AdminGetLesson = async (id: string) => {
  await requireAdmin();
  const data = await prisma.lesson.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      videoKey: true,
      thumbnailKey: true,
      position: true,
    },
  });
  if (!data) {
    throw notFound();
  }
  return data;
};
export default AdminGetLesson;

export type AdminLessonType = Awaited<ReturnType<typeof AdminGetLesson>>;
