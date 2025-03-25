"use client";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  Settings,
  Folder,
  UserRoundCog,
  Stethoscope,
  Receipt,
  BookMarked,
  Contact,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const patientItems = [
  {
    title: "Appointments",
    url: "/admin/dashboard/",
    icon: Calendar,
  },

  {
    title: "Medical Records",
    url: "admin/medical_records",
    icon: Folder,
  },
];

const staffItems = [
  {
    title: "Doctors",
    url: "/admin/doctors",
    icon: UserRoundCog,
  },
  {
    title: "Telehealth",
    url: "admin/telehealth",
    icon: Stethoscope,
  },
];

const billings = [
  {
    title: "Billings and Payments",
    url: "/admin/billings",
    icon: Receipt,
  },
  {
    title: "Insurance Claims",
    url: "admin/insurance",
    icon: BookMarked,
  },
];

const footer = [
  {
    title: "Settings",
    url: "admin/settings",
    icon: Settings,
  },
  {
    title: "Contact & Support",
    url: "admin/contact",
    icon: Contact,
  },
];

export function AppSidebar() {
  const { logout } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Patient Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {patientItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Staff Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staffItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Fincncials & Billings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {billings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="h-0.5 w-full bg-slate-500 mt-4"></div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Staff Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {footer.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <button
            onClick={() => logout()}
            className="mt-8 text-white rounded-md bg-[#192655] p-3 hover:text-red-600 transition-colors duration-500">
            Logout
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
