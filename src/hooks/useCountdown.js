import { useEffect, useState } from "reactn";

const useCountdown = (targetDate) => {
  const countdownDate = targetDate.getTime();

  const [countDown, setCountDown] = useState(countdownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countdownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  // Calculate time left.
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default useCountdown;
