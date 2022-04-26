import React, { useMemo } from "reactn";
import moment from "moment";
import useCountdown from "../hooks/useCountdown";
import { firestore } from "../firebase";
import { useEffect, useState } from "reactn";

const Countdown = ({ title = "Reserva la fecha", ...props }) => {

  const [ deadlineTime, setDeadlineTime ] = useState(null);

  const [days, hours, minutes, seconds] = useCountdown(deadlineTime);

  useEffect(() => {
    const fetchCountdowm = async () => {
      const landingSettings = (await firestore.doc("settings/landing").get()).data();

      setDeadlineTime(moment(landingSettings.countdown.toDate()));
    };

    fetchCountdowm();
  }, []);

  const DisplayNumber = ({value, label}) => (
    <span className="mx-0 lg:mx-8">
      <div className="min-w-[80px] lg:min-w-[90px] text-4xl lg:text-8xl font-bold text-center mb-3">{value}</div>
      <div className="text-md lg:text-4xl text-pink-500 text-center">{label}</div>
    </span>);

  const displayContent = useMemo(() => {
    if (deadlineTime === null || days + hours + minutes + seconds <= 0)
      return (
        <div className="flex items-center justify-center">
        <DisplayNumber value={0} label="Días"/>
        <DisplayNumber value={0} label="Horas"/>
        <DisplayNumber value={0} label="Minutos"/>
        <DisplayNumber value={0} label="Segundos"/>
        </div>
      );

    return (
      <div className="flex items-center justify-center">
        <DisplayNumber value={days} label="Días"/>
        <DisplayNumber value={hours} label="Horas"/>
        <DisplayNumber value={minutes} label="Minutos"/>
        <DisplayNumber value={seconds} label="Segundos"/>
      </div>
    );
  }, [days, hours, minutes, seconds]);

  return (
    <div className="min-h-[50px] pt-28 pb-20 bg-whiteDark">
      <div className="text-center text-xl lg:text-4xl font-bold mb-16">{title}</div>
      {displayContent}
    </div>
  );
};

export default Countdown;


