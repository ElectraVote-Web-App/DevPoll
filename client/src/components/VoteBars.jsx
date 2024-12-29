export const VoteBars = () => {
  const votes = [
    {
      id: 2,
      stage_name: "PHP",
    },
    {
      id: 1,
      stage_name: "JAVA",
    },
  ];

  return (
    <form className={`space-y-1`}>
      {votes?.map((vote) => (
        <div
          key={vote.id}
          className={`relative flex px-3 md:px-2 h-[35px] cursor-pointer items-center justify-between gap-x-1 rounded-xl bg-gray-200  font-roboto font-medium md:h-12`}
          onClick={(e) => {
            e.preventDefault();
            /* handleChange(vote.id); */
          }}
        >
          <input
            type="radio"
            name="voted_for"
            className="z-10 accent-black cursor-pointer mx-2 h-4 w-4 outline-black"
            id={vote.id}
            value={vote.id}
            /* onChange={() => handleChange(vote.id)}
            checked={userVotedFor === vote.id} */
          />
          <label
            htmlFor={vote.id}
            className="z-10 flex w-full overflow-hidden cursor-pointer h-full items-center justify-between"
          >
            <span className="z-10 truncate text-nowrap font-bold text-black">
              {vote.stage_name}
            </span>
          </label>
        </div>
      ))}
    </form>
  );
};
