import { getSingleCourse } from "@/app/data/course/get-course";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import { RenderDescription } from "@/components/rich-text-editor/render-description";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Book,
  CheckCircle,
  ChevronDown,
  CirclePlay,
  Clock,
  FlameKindling,
  LibraryBig,
  MonitorPlay,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { enrollInCourseAction } from "./actions";
import { EnrollmentBtn } from "./_components/enrollment-btn";

type Params = Promise<{ slug: string }>;

const CoursePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await getSingleCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);
  const thumbnailUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;
  return (
    <div className="container p-4 md:px-6 mx-auto">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-4">
        <div className="order-1 lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-md shadow-lg">
            <Image
              src={thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                {course.subDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <FlameKindling className="size-4" />
                {course.level}
              </Badge>
              <Badge variant="secondary">
                <LibraryBig className="size-4" />
                {course.category}
              </Badge>
              <Badge variant="secondary">
                <Clock className="size-4" />
                {course.duration} hrs
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Course Description</h2>
              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Course Content</h2>
              <div>
                {course.chapter.length} Chapters |{" "}
                {course.chapter.reduce(
                  (acc, chapter) => acc + chapter.lessons.length,
                  0
                ) || 0}{" "}
                Lessons
              </div>
            </div>
            <div className="space-y-4">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <Card className="p-0 overflow-hidden border-2 transition-all duration-200 gap-0">
                    <CollapsibleTrigger>
                      <div>
                        <CardContent className="p-4 hover:bg-primary/10 transition-colors duration-200">
                          <div>
                            <div className="flex items-center gap-4">
                              <Badge>{index + 1}</Badge>
                              <div className="flex items-center justify-between w-full">
                                <h3 className="font-semibold text-left">
                                  {chapter.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <p className="text-muted-foreground text-sm">
                                    {chapter.lessons.length} lesson
                                    {chapter.lessons.length !== 1 ? "s" : ""}
                                  </p>
                                  <ChevronDown className="size-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-card border-t ">
                        <div className="p-4 space-y-4">
                          {chapter.lessons.map((lesson, index) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-2 hover:bg-primary/10 transition-colors duration-200 p-2 rounded-md"
                            >
                              <MonitorPlay className="size-4" />
                              <p className="text-muted-foreground text-sm">
                                {lesson.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
        {/* Enrollment */}
        <div className="order-2 lg:col-span-1">
          <div className="sticky top-20">
            <Card className="py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Price:</span>
                  <p className="font-semibold">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                    }).format(course.price)}
                  </p>
                </div>
                <div className="my-4 bg-muted p-4">
                  <h4 className="font-medium">
                    What you get after purchasing the course:
                  </h4>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <Clock className="size-6 text-primary" />
                      <div>
                        <p className="text-sm">Course Duration:</p>
                        <p className="text-sm text-muted-foreground">
                          {course.duration} hrs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FlameKindling className="size-6 text-primary" />
                      <div>
                        <p className="text-sm">Difficulty Level:</p>
                        <p className="text-sm text-muted-foreground">
                          {course.level}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <LibraryBig className="size-6 text-primary" />
                      <div>
                        <p className="text-sm">Category:</p>
                        <p className="text-sm text-muted-foreground">
                          {course.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Book className="size-6 text-primary" />
                      <div>
                        <p className="text-sm">Total Lessons:</p>
                        <p className="text-sm text-muted-foreground">
                          {course.chapter.reduce(
                            (acc, chapter) => acc + chapter.lessons.length,
                            0
                          ) || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 space-y-4">
                  <h4>This course includes:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      <span>Access to all course materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      <span>Full life time access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      <span>Progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4" />
                      <span>Access on Mobile and Desktop</span>
                    </li>
                  </ul>
                </div>
                <form
                  action={async () => {
                    "use server";
                    enrollInCourseAction(course.id);
                  }}
                >
                  {isEnrolled ? (
                    <Button className="w-full" asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <CirclePlay className="size-4" /> Watch Now
                      </Link>
                    </Button>
                  ) : (
                    <EnrollmentBtn courseId={course.id} />
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
