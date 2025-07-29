import DashboardUser from "@/components/dashboard/dashboard-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import requireUser from "@/hooks/require-user";
import { GalleryVerticalEnd, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const UserAppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const session = await requireUser();
  return (
    <Sidebar collapsible="icon" {...props} className="overflow-hidden">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <GalleryVerticalEnd className="!size-5 text-primary" />
                <span className="text-base font-semibold">Studio IO</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="!size-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUser
          user={{
            name: session.user.name || "Unknown User",
            email: session.user.email || "",
            avatar: session.user.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};
export default UserAppSidebar;
