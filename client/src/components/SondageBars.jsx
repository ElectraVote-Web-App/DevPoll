export const SondageBars = () => {
  const votes = [
    {
      id: 2,
      stage_name: "PHP",
      vote_count: 80,
      percentage: 80,
    },
    {
      id: 1,
      stage_name: "JAVA",
      vote_count: 20,
      percentage: 20,
    },
    
  ];

  const error = "Please select an option first";


  return (
    <form
      className={`space-y-1`}
    >
      {votes?.map((vote) => (
        <div
          key={vote.id}
          className={`relative flex px-3 md:px-2 h-[35px] cursor-pointer items-center justify-between gap-x-1 rounded-xl bg-[#F2F2F2]  font-roboto font-medium md:h-12`}
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
          <span className="z-10 text-nowrap text-xs font-medium text-black lg:text-sm">
            ({vote.vote_count}) {vote.percentage}%
          </span>
          </label>
          <div
            className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-700 ease-in-out ${
              Number(vote.percentage) > 50 ? "bg-[#c5e0fc]" : Number(vote.percentage) === 50 ? "bg-gray-300" :
              Number(vote.percentage) < 50 ? "bg-gray-300" : ""}`}
            style={{ width: `${vote.percentage}%` }}
          ></div>
        </div>
      ))}
      {error && (<p className="text-[0.8rem] font-medium text-destructive">{error}</p>)}
    </form>
  )
}