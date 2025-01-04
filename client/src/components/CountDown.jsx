import { PropTypes } from 'prop-types'

import { useEffect, useState } from 'react';

const CountDown = ({ end_time }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(end_time) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="text-sm text-muted-foreground">
      <div className="flex items-center gap-x-[2px]">
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">{String(timeLeft.days).padStart(2, '0')}</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div>:</div>
        <div className="text-white font-semibold bg-gray-600 rounded-md px-2 py-[6px]">{String(timeLeft.seconds).padStart(2, '0')}</div>
      </div>
      <span className="text-xs">
        Days : Hours: Minutes : Seconds
      </span>
    </div>
  );
};
export default CountDown

CountDown.propTypes = {
  end_time: PropTypes.string.isRequired
}