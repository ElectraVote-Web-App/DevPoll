import { useGetPopularActivePolls } from "@/services/queries";
import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = ({ AUTH }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning 👋" : "Good Evening 👋";
  const { data, error, isError, isLoading } = useGetPopularActivePolls();

  if (isLoading) {
    return (
      <div className="pb-20">
      <h1 className="text-2xl font-semibold text-gray-800">{greeting}</h1>
      <section className="mt-10 space-y-8 sm:space-y-10">
        <div className="flex justify-center items-center">
          {/* POLLS[0] */}
          <div>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute sm:text-base text-xs z-10  bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
                <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </div>
          {/* POLLS[1] */}
          <div>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-14 sm:w-32 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
              <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          {/* POLLS[2] */}
          <Link className="self-end sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full  top-16 shadow-xl">
              <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </Link>
          
          <div 
            className="bg-white gap-x-2 rounded-3xl shadow-lg font-medium text-xl sm:text-2xl px-6 py-4 sm:px-8 sm:py-6 flex justify-between items-center mr-8 self-start mb-4 hover:scale-110 transition-transform duration-200 opacity-0 "
          >
            <h2 >
              {AUTH ? (
                <>
                  You have <br />
                   Active Polls
                </>
              ) : (
                <>
                  Login first <br /> to participate <br /> in Polls!
                </>
              )}
            </h2>
            <ChevronRight />
          </div>
          {/* POLLS[3] */}
          <div className="self-start sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute z-10 bg-white px-6 py-3 rounded-full left-10 -top-6 shadow-xl">
              <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          {/* POLLS[4] */}
          <div>
            <div className=" w-40 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-28 sm:w-32 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full top-24 sm:top-28 shadow-xl">
              <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </div>
          {/* POLLS[5] */}
          <div>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square animate-pulse bg-gray-300 ">
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
              <p className="bg-gray-200 animate-pulse min-w-10 rounded-full h-2"></p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
  };

  if (isError) return <h1 className="text-red-500">Error: {error.message}</h1>;

  const { active_polls_count, polls } = data;
  const trunc_polls = polls.map(poll => poll.poll_title.length > 10 ? {...poll, poll_title: poll.poll_title.substring(0, 10)+'...'} : poll);
  console.log(trunc_polls);
  /*
    -> POLL OBJECT STRUCTURE <- 
    creator_img,
    creator_username,
    poll_id,
    poll_title,
    total_votes
  */

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-semibold text-gray-800">{greeting}</h1>
      <section className="mt-10 space-y-8 sm:space-y-10">
        <div className="flex justify-center items-center">
          {/* POLLS[0] */}
          <Link to={`/polls/${trunc_polls[0].poll_id}`}>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[0].creator_img}`} title={trunc_polls[0].creator_username} />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
                {trunc_polls[0].poll_title}
              </span>
            </div>
          </Link>
          {/* POLLS[1] */}
          <Link to={`/polls/${trunc_polls[1].poll_id}`}>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-14 sm:w-32 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[1].creator_img}`} title={trunc_polls[1].creator_username} />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
              {trunc_polls[1].poll_title}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex justify-evenly items-center">
          {/* POLLS[2] */}
          <Link to={`/polls/${trunc_polls[2].poll_id}`} className="self-end sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[2].creator_img}`} title={trunc_polls[2].creator_username} />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full  top-16 shadow-xl">
              {trunc_polls[2].poll_title}
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
                  {active_polls_count} Active Polls
                </>
              ) : (
                <>
                  Login first <br /> to participate <br /> in Polls!
                </>
              )}
            </h2>
            <ChevronRight />
          </Link>
          {/* POLLS[3] */}
          <Link to={`/polls/${trunc_polls[3].poll_id}`} className="self-start sm:block hidden">
            <div className=" w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[3].creator_img}`} title={trunc_polls[3].creator_username} />
              </div>
              <span className="absolute z-10 bg-white px-6 py-3 rounded-full left-10 -top-6 shadow-xl">
                {trunc_polls[3].poll_title}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex justify-center ">
          {/* POLLS[4] */}
          <Link to={`/polls/${trunc_polls[4].poll_id}`}>
            <div  className=" w-40 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-28 sm:w-32 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[4].creator_img}`} title={trunc_polls[4].creator_username} />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full top-24 sm:top-28 shadow-xl">
              {trunc_polls[4].poll_title}
              </span>
            </div>
          </Link>
          {/* POLLS[5] */}
          <Link to={`/polls/${trunc_polls[5].poll_id}`}>
            <div className="w-36 sm:w-48 relative hover:scale-125 transition-transform duration-200">
              <div className="overflow-hidden w-20 rounded-full aspect-square bg-gray-300 ">
                <img src={`./public/avatars/${trunc_polls[5].creator_img}`} title={trunc_polls[5].creator_username} />
              </div>
              <span className="absolute sm:text-base text-xs z-10 bg-white p-3 sm:px-6 sm:py-3 rounded-full left-10 -top-6 shadow-xl">
              {trunc_polls[5].poll_title}
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
