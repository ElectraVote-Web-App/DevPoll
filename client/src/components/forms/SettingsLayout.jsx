import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/forms/SidebarNav";
import { Outlet } from "react-router-dom";
import BackButton from "../BackButton";
import { Card } from "@/components/ui/card";  

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/me/settings",
  },
  {
    title: "Account",
    href: "/me/settings/account",
  },
  // {
  //   title: "Appearance",
  //   href: "/me/settings/appearance",
  // },
  {
    title: "Notifications",
    href: "/me/settings/notifications",
  },
  // {
  //   title: "Display",
  //   href: "/me/settings/display",
  // },
];

export default function SettingsLayout({ children }) {
  return (
    <div className="space-y-6 pb-16 block md:block"> {/* Ensure the layout is always visible */}
      <BackButton />
      
      {/* Card Layout */}
      <Card className="space-y-6 p-6 shadow-md rounded-lg">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {children}
            <Outlet />
          </div>
        </div>
      </Card>
    </div>
  );
}
