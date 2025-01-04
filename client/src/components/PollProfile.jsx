import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils"

function PollProfile({className, pic, username}) {
  return (
    <div className={cn("bg-white rounded-full flex p-[6px] w-fit gap-x-2 items-center", className)}>
      <Avatar className="w-6 h-6">
        <AvatarImage src={pic} />
        <AvatarFallback>{username.slice(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <p className="font-semibold text-sm pr-1">{username}</p>
    </div>
  );
}
export default PollProfile;

PollProfile.propTypes = {
  className: PropTypes.string,
  pic: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
