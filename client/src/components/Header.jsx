import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutDialog } from "@/components/logout-dialog";
import { useAuth } from "@/context/AuthContext";
import { Bell, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user, logout: handleLogout } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      title: "New Poll from Lexus!",
      description: "30 minutes ago",
    },
    {
      title: "New Poll from Garett81!",
      description: "1 hour ago",
    },
    {
      title: "New Poll from Otto_Nolan97!",
      description: "1 hour ago",
    },
  ];

  const newNotif = true;

  return (
    <header className="bg-white z-50 shadow fixed left-0 top-0 w-full h-16 flex justify-between items-center px-5 xl:px-[333px]">
      <NavLink to="/" className="font-bold text-xl text-black">
        DEVPOLL
      </NavLink>
      {!user && (
        <div className="flex gap-x-3">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            <Link to="/signin">Login</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="hidden sm:block rounded-full"
          >
            <Link to="/signup">Signup</Link>
          </Button>
        </div>
      )}
      {user && (
        <div className="flex gap-x-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative cursor-pointer">
              {newNotif && (
                <div className="bg-red-500 absolute w-2 aspect-square rounded-full top-0 right-0"></div>
              )}
              <Bell size={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-transparent border-transparent shadow-none">
              <Card className={cn("w-[380px] ")}>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Check /> Mark all as read
                  </Button>
                </CardFooter>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={`./public/avatars/${user.img}`} />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  navigate("/me");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  navigate("/me/settings");
                }}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => {navigate('/about')}}>
                About
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <LogoutDialog onConfirm={handleLogout} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
