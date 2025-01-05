import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useVotePoll } from "@/services/mutations";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import autoAnimate from "@formkit/auto-animate";

export const SondageBars = ({ options: initialOptions, poll }) => {
  const { id: pollId } = useParams();
  const { user } = useAuth();
  const [options, setOptions] = useState(initialOptions); // Manage options state locally
  const userVotedFor = initialOptions.find((option) => option.user_voted)?.id;
  const [selectedOption, setSelectedOption] = useState(userVotedFor);
  const [previousSelectedOption, setPreviousSelectedOption] =
    useState(userVotedFor); // Track the previous option
  const [error, setError] = useState(null);
  const mutation = useVotePoll();
  const parentRef = useRef(null);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  const handleVote = (e) => {
    e.preventDefault(); // Prevent the form submission behavior

    if (!selectedOption) {
      setError("Please select an option first");
      return;
    }

    if (selectedOption === previousSelectedOption) {
      setError("You cannot vote for the same option twice.");
      return;
    }

    if (!pollId) {
      setError("Poll ID is required");
      return;
    }

    mutation.mutate(
      { pollId, optionId: selectedOption },
      {
        onSuccess: () => {
          setError(null);

          setOptions((prevOptions) => {
            const updatedOptions = prevOptions.map((option) => {
              if (option.id === selectedOption) {
                return { ...option, votes_count: option.votes_count + 1 };
              } else if (option.id === previousSelectedOption) {
                return {
                  ...option,
                  votes_count: Math.max(option.votes_count - 1, 0),
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

          setPreviousSelectedOption(selectedOption);
        },
        onError: (error) => {
          console.error("Error voting:", error);
          setError(error.response?.data?.message || "Error voting");
        },
      }
    );
  };

  const handleChange = (optionId) => {
    setSelectedOption(optionId);
    setError(null); // Clear any previous error when changing the selection
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

  return (
    <form className="space-y-1">
      <div ref={parentRef} className="space-y-1">
        {options
          ?.slice() // Create a shallow copy to avoid modifying the original state
          .sort((a, b) => b.percentage - a.percentage) // Sort by percentage in descending order
          .map((option) => (
            <div
              key={option.id}
              className={`relative flex px-3 md:px-2 h-[35px] cursor-pointer items-center justify-between gap-x-1 rounded-xl bg-[#F2F2F2] font-roboto font-medium md:h-12 ${
                selectedOption === option.id
                  ? "outline outline-2 outline-blue-500"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleChange(option.id);
              }}
            >
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
              <label
                htmlFor={option.id}
                className="z-10 flex w-full overflow-hidden cursor-pointer h-full items-center justify-between"
              >
                <span className="z-10 truncate text-nowrap font-bold text-black">
                  {option.content}
                </span>
                <span className="z-10 text-nowrap text-xs font-medium text-black lg:text-sm">
                  ({option.votes_count}) {option.percentage}%
                </span>
              </label>
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
            </div>
          ))}
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

SondageBars.propTypes = {
  poll: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      votes_count: PropTypes.number.isRequired,
      user_voted: PropTypes.bool,
      poll_id: PropTypes.number,
    })
  ).isRequired,
};