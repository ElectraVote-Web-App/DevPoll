import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = ({ AUTH }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning 👋" : "Good Evening 👋";

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-semibold text-gray-800">{greeting}</h1>
      <section className="mt-10 space-y-8 sm:space-y-10">
        <div className="flex justify-center items-center">
          <Link>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar1.png" alt="" />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
          <Link>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-14 sm:w-32 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar2.png" alt="" />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
        </div>
        <div className="flex justify-evenly items-center">
          <Link className="self-end sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar3.png" alt="" />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full  top-16 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
          <Link
            to={AUTH ? "/polls" : "/signin"}
            className="bg-white gap-x-2 rounded-3xl shadow-lg font-medium text-xl sm:text-2xl px-6 py-4 sm:px-8 sm:py-6 flex justify-between items-center mr-8 self-start mb-4 hover:scale-110 transition-transform duration-200"
          >
            <h2>
              {AUTH ? (
                <>
                  You have <br />
                  12 Active Polls
                </>
              ) : (
                <>
                  Login first <br /> to participate <br /> in Polls!
                </>
              )}
            </h2>
            <ChevronRight />
          </Link>
          <Link className="self-start sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar4.png" alt="" />
              </div>
              <span className="absolute z-10 bg-white px-6 py-3 rounded-full left-10 -top-6 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
        </div>
        <div className="flex justify-center ">
          <Link>
            <div className=" w-40 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-28 sm:w-32 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar5.png" alt="" />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full top-24 sm:top-28 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
          <Link>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-blue-500 ">
                <img src="./public/avatars/avatar1.png" alt="" />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
                Java or PHP?
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
