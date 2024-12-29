const CountDown = () => {
  return (
    <div className="text-sm text-muted-foreground">
      <div className="flex items-center gap-x-[2px]">
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">00</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">23</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">11</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">05</div>
      </div>
      <span className="text-xs">
        Days : Hours: Minutes : Seconds
      </span>
    </div>
  )
}
export default CountDown