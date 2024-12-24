import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function HomePageAvatar() {
  const username = "Cristina";

  return (
    <Link className="relative">
          <Avatar className="shadow-xl aspect-square w-20 h-20 hover:scale-125 transition-transform duration-200">
            <AvatarImage src="./public/avatars/avatar6.png" />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="bg-white px-5 py-3 rounded-3xl shadow-xl absolute z-20 left-10 -top-6">
            Java or PHP?
          </div>
        </Link>
  )
}