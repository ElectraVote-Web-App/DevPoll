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

export default function Header({AUTH}) {
  const username = "Cristina";
  const logout = () => {
    alert("Logout");
  };

  return (
    <header className="bg-white z-50 shadow fixed left-0 top-0 w-full h-16 flex justify-between items-center px-5 xl:px-[333px]">
      <NavLink to='/' className="font-bold text-xl">DEVPOLL</NavLink>
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
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

Header.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};