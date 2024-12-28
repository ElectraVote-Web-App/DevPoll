import { Button } from "./ui/button"
import PropTypes from "prop-types"
import PollProfile from "./PollProfile"

const Poll = ({status}) => {

  return (
    <div className="bg-blue-500 p-3 rounded-2xl space-y-4 hover:shadow-3xl transition duration-300">
        <div className="flex justify-between items-center ">
          <PollProfile pic={"./public/avatars/avatar6.png"} username={'Moumen'}/>
          <div className="flex gap-x-2">
            {
              status === "closed" && (<p className="bg-[#FF5A5A] text-white select-none py-2 px-3 rounded-full text-sm flex items-center">
                Closed
              </p>)
            }
            <button className="p-2 rounded-full bg-[#277EBD] flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="size-5 stroke-white stroke-2 -rotate-45 flex justify-center items-center"
                viewBox="0 0 24 24"
              >
                <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-white font-medium">
        What is the Most Popular P.L?
        </p>
        <span className="text-white text-xs">5 Minutes ago</span>
        <Button className='flex w-full rounded-xl bg-[#277EBD] hover:bg-white hover:text-[#277EBD] shadow-none text-white mt-3'>
          Tap to see
        </Button>
      </div>
  )
}
export default Poll

Poll.propTypes = {
  status: PropTypes.bool.isRequired,
};