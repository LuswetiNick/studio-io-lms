import AnalyticsSection from "@/components/dashboard/analytics-section";
import ChartSection from "@/components/dashboard/chart-section";
import { adminGetEnrollments } from "../data/admin/admin-get-enrollments";
import requireAdmin from "../data/admin/require-admin";

const Dashboard = async () => {
  await requireAdmin();
  const enrollmentData = await adminGetEnrollments();
  return (
    <section className="mx-auto p-4 md:px-8 w-full flex flex-col gap-y-6">
      <AnalyticsSection />
      <ChartSection data={enrollmentData} />
    </section>
  );
};
export default Dashboard;
