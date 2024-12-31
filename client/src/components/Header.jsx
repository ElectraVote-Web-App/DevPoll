import { Link, NavLink } from "react-router-dom";
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
import PropTypes from "prop-types";
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

export default function Header({ AUTH }) {
  const username = "Cristina";
  const logout = () => {
    alert("Logout");
  };

  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ];

  const newNotif = true;

  return (
    <header className="bg-white z-50 shadow fixed left-0 top-0 w-full h-16 flex justify-between items-center px-5 xl:px-[333px]">
      <NavLink to="/" className="font-bold text-xl text-black">
        DEVPOLL
      </NavLink>
      {!AUTH && (
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
      {AUTH && (
        <div className="flex gap-x-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative cursor-pointer">
              {
                newNotif && (<div className="bg-red-500 absolute w-2 aspect-square rounded-full top-0 right-0"></div>)
              } 
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
                <AvatarImage src="./public/avatars/avatar6.png" />
                <AvatarFallback>
                  {username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/me">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/me/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
