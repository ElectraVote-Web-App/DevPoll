import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useVotePoll } from "@/services/mutations";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import autoAnimate from "@formkit/auto-animate";
import { useGetVoteStatistics } from "@/services/queries";

export const VoteBars = ({ options: initialOptions, poll }) => {
  const { id: pollId } = useParams();
  const { user } = useAuth();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previousSelectedOption, setPreviousSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const mutation = useVotePoll();
  const parentRef = useRef(null);

  const { data: statistics, refetch } = useGetVoteStatistics(pollId);

  useEffect(() => {
    // Initialize options with percentage and votes count
    if (Array.isArray(initialOptions) && initialOptions.length) {
      const totalVotes = initialOptions.reduce(
        (acc, curr) => acc + (curr.votes_count || 0),
        0
      );
      setOptions(
        initialOptions.map((option) => ({
          ...option,
          percentage:
            totalVotes > 0
              ? Math.round((option.votes_count / totalVotes) * 100)
              : 0,
        }))
      );
      const userVotedFor = initialOptions.find((option) => option.user_voted);
      setSelectedOption(userVotedFor ? userVotedFor.id : null);
      setPreviousSelectedOption(userVotedFor ? userVotedFor.id : null);
    }
  }, [initialOptions]);

  useEffect(() => {
    if (poll.end_time < new Date().toISOString()) {
      refetch();
    }
  }, [poll.end_time, refetch]);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  const handleVote = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Please select an option first.");
      return;
    }

    if (selectedOption === previousSelectedOption) {
      setError("You cannot vote for the same option twice.");
      return;
    }

    if (!pollId) {
      setError("Poll ID is required.");
      return;
    }

    mutation.mutate(
      { pollId, optionId: selectedOption },
      {
        onSuccess: () => {
          setError(null);
          setPreviousSelectedOption(selectedOption);

          // Update options with the new votes and recalculate percentages
          setOptions((prevOptions) => {
            const updatedOptions = prevOptions.map((option) => {
              if (option.id === selectedOption) {
                return { ...option, votes_count: (option.votes_count || 0) + 1 };
              }
              if (option.id === previousSelectedOption) {
                return {
                  ...option,
                  votes_count: Math.max((option.votes_count || 0) - 1, 0),
                };
              }
              return option;
            });

            const totalVotes = updatedOptions.reduce(
              (acc, curr) => acc + curr.votes_count,
              0
            );

            return updatedOptions.map((option) => ({
              ...option,
              percentage:
                totalVotes > 0
                  ? Math.round((option.votes_count / totalVotes) * 100)
                  : 0,
            }));
          });
        },
        onError: (error) => {
          console.error("Error voting:", error);
          setError(error.response?.data?.message || "Error voting.");
        },
      }
    );
  };

  const handleChange = (optionId) => {
    setSelectedOption(optionId);
    setError(null);
  };

  const isButtonDisabled =
    !user ||
    user.id === poll.creator.id ||
    poll.end_time < new Date().toISOString() ||
    selectedOption === previousSelectedOption;

  const buttonContent = !user
    ? "Login to vote"
    : user.id === poll.creator.id
    ? "You can't vote on your own poll"
    : poll.end_time < new Date().toISOString()
    ? "Poll is closed"
    : selectedOption === previousSelectedOption
    ? "Vote"
    : "Vote";

  const renderOptions = (optionsData) => {
    return optionsData
      .slice()
      .sort((a, b) => b.percentage - a.percentage)
      .map((option) => (
        <div
          key={option.id}
          className={`relative flex px-3 md:px-2 h-[35px] items-center justify-between gap-x-1 rounded-xl bg-gray-200 font-roboto font-medium md:h-12 ${
            selectedOption === option.id ? "outline outline-2 outline-blue-500" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (poll.end_time >= new Date().toISOString()) {
              handleChange(option.id);
            }
          }}
        >
          {poll.end_time >= new Date().toISOString() && (
            <input
              type="radio"
              name="voted_for"
              className={`z-10 cursor-pointer mx-2 h-4 w-4 outline-black ${
                selectedOption === option.id ? "accent-black" : "accent-gray-400"
              }`}
              id={option.id}
              value={option.id}
              onChange={() => handleChange(option.id)}
              checked={selectedOption === option.id}
            />
          )}
          <label
            htmlFor={option.id}
            className="z-10 flex w-full overflow-hidden cursor-pointer h-full items-center justify-between"
          >
            <span className="z-10 truncate text-nowrap font-bold text-black">
              {option.content}
            </span>
            {poll.end_time < new Date().toISOString() && (
              <span className="z-10 text-nowrap text-xs font-medium text-black lg:text-sm">
                ({option.votes_count || 0}) {option.percentage}%
              </span>
            )}
          </label>
          {poll.end_time < new Date().toISOString() && (
            <div
              className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-700 ease-in-out ${
                option.percentage > 50
                  ? "bg-[#c5e0fc]"
                  : option.percentage === 50
                  ? "bg-gray-300"
                  : "bg-gray-300"
              }`}
              style={{ width: `${option.percentage}%` }}
            ></div>
          )}
        </div>
      ));
  };

  if (poll.end_time < new Date().toISOString()) {
    return (
      <div ref={parentRef} className="space-y-1">
        {Array.isArray(statistics) && renderOptions(statistics)}
      </div>
    );
  }

  return (
    <form className="space-y-1">
      <div ref={parentRef} className="space-y-1">
        {Array.isArray(options) && renderOptions(options)}
      </div>
      <div>
        <Button
          disabled={isButtonDisabled}
          onClick={handleVote}
          className="rounded-xl w-full bg-blue-500 hover:bg-blue-600 mt-3"
          size="lg"
        >
          {buttonContent}
        </Button>
      </div>
      {error && (
        <p className="text-[0.8rem] font-medium text-destructive">{error}</p>
      )}
    </form>
  );
};

VoteBars.propTypes = {
  poll: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      user_voted: PropTypes.bool,
      poll_id: PropTypes.number,
      votes_count: PropTypes.number,
      percentage: PropTypes.number,
    })
  ).isRequired,
};
