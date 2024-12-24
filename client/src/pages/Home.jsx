import ChatBubble from "@/components/ChatBubble";
/* import HomePageAvatar from "@/components/HomePageAvatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom"; */

const Home = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning 👋" : "Good Evening 👋";

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">{greeting}</h1>
      <section className="mt-10">
        <ChatBubble />
        <h2 className="bg-white rounded-3xl shadow-lg inline-block font-medium text-2xl px-8 py-6">
          Login first <br /> to see polls!
        </h2>
      </section>
    </div>
  );
};

export default Home;
