import { Link } from "react-router-dom";

const ChatBubble = () => {
  return (
    <Link>
      <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
        <div className="overflow-hidden w-20 rounded-full aspect-square bg-blue-500 ">
          <img src="./public/avatars/avatar1.png" alt="" />
        </div>
        <span className="absolute z-10 bg-white px-6 py-3 rounded-full left-10 -top-6 shadow-xl">
          Java or PHP?
        </span>
      </div>
    </Link>
  );
};

export default ChatBubble;
