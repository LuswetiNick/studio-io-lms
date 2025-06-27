import { GalleryVerticalEnd, Layers2 } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardUser from "./dashboard-user";
import requireUser from "@/hooks/require-user";
import { redirect } from "next/navigation";

const AppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const session = await requireUser();

  // if (!session) {
  //   return redirect("/login");
  // }
  return (
    <Sidebar collapsible="icon" {...props} className="overflow-hidden">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <GalleryVerticalEnd className="!size-5 text-primary" />
                <span className="text-base font-semibold">Studio IO</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <DashboardUser
          user={{
            name: session.user.name,
            email: session.user.email,
            avatar: session.user.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
