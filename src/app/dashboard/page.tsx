import requireUser from "@/hooks/require-user";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await requireUser();
  if (!session) {
    return redirect("/login");
  }
  return <div>dashboard page</div>;
};
export default Dashboard;
