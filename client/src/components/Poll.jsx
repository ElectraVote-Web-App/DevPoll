import { Button } from "./ui/button";
import PropTypes from "prop-types";
import PollProfile from "./PollProfile";
import { Link } from "react-router-dom";

const Poll = ({ poll }) => {
  const sharePoll = () => {
    if (navigator.share) {
      navigator
        .share({
          title: poll.title,
          text: "Check out this poll",
          url: `${import.meta.env.VITE_FRONTEND_URL}/polls/${poll.id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web share not supported");
    }
  };

  // console.log(poll.end_time);
  // console.log(new Date(poll.end_time));
  const status = new Date(poll.end_time) < new Date() ? "closed" : "open";

  return (
    <div className="bg-white text-gray-900 p-4 rounded-xl shadow-lg space-y-4 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
      <div className="flex justify-between items-center">
        <PollProfile
          pic={`./public/avatars/${poll.creator.img}`}
          username={poll.creator.username}
        />
        <div className="flex gap-x-2">
          {status === "closed" && (
            <p className="bg-red-200 text-red-800 select-none py-1.5 px-3 rounded-full text-sm flex items-center">
              Closed
            </p>
          )}
          <button
            onClick={sharePoll}
            className="p-2 rounded-full hover:bg-[#277EBD] bg-blue-500 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 stroke-white stroke-2 -rotate-45"
              viewBox="0 0 24 24"
            >
              <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
      <p className="font-medium text-gray-800">
        {poll.title.length > 30 ? poll.title.slice(0, 30) + "..." : poll.title}
      </p>
      <span className="text-sm text-gray-500">{poll.created_at_formatted}</span>
      <Button
        asChild
        className="flex w-full rounded-lg hover:bg-[#277EBD] bg-blue-500 text-white shadow-none mt-3"
      >
        <Link to={`/polls/${poll.id}`}>Tap to see</Link>
      </Button>
    </div>
  );
};
export default Poll;

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
};
