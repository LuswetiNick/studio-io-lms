import { adminGetStats } from "@/app/data/admin/admin-get-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookPlus, LibraryBig, ListChecks, Users } from "lucide-react";

const AnalyticsSection = async () => {
  const { totalUsers, totalCustomers, totalCourses, totalLessons } =
    await adminGetStats();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between  space-y-0">
          <div>
            <CardDescription>Total Signups</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalUsers}
            </CardTitle>
          </div>
          <Users className="size-6 " />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs ">
            Registered users on the platform
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between  space-y-0">
          <div>
            <CardDescription>Total Enrollments</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <BookPlus className="size-6" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs ">
            Enrollments on the platform
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between  space-y-0">
          <div>
            <CardDescription>Total Courses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCourses}
            </CardTitle>
          </div>
          <LibraryBig className="size-6" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs ">
            Available Courses on the platform
          </p>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between  space-y-0">
          <div>
            <CardDescription>Total Lessons</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalLessons}
            </CardTitle>
          </div>
          <ListChecks className="size-6" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs ">
            Total learning content on the platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default AnalyticsSection;
