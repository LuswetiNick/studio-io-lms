import requireUser from "@/hooks/require-user";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  await requireUser();
  return <div>dashboard page</div>;
};
export default Dashboard;
