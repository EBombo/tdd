import React, { useGlobal, useMemo } from "reactn";
import useCountdown from "../hooks/useCountdown";
import { spinLoaderMin } from "./common/loader";
import { Sponsors } from "../pages/home/Sponsors";
import { sponsorsLists } from "./common/DataList";

const Countdown = React.memo(({ title = "Reserva la fecha", deadline, disableSponsors, dark, ...props }) => {
  const [days, hours, minutes, seconds] = useCountdown(deadline);

  const DisplayNumber = React.memo(({ value, label }) => (
    <span className="mx-0 lg:mx-8">
      <div className="min-w-[80px] lg:min-w-[90px] text-4xl lg:text-5xl font-bold text-center mb-3">{value}</div>
      <div className="text-md lg:text-4xl text-pink-500 text-center">{label}</div>
    </span>
  ));

  const displayContent = useMemo(() => {
    if (deadline === null || days + hours + minutes + seconds <= 0)
      return (
        <div className="flex items-center justify-center">
          <DisplayNumber value={0} label="Días" />
          <DisplayNumber value={0} label="Horas" />
          <DisplayNumber value={0} label="Minutos" />
          <DisplayNumber value={0} label="Segundos" />
        </div>
      );

    return (
      <div className="flex items-center justify-center">
        <DisplayNumber value={days} label="Días" />
        <DisplayNumber value={hours} label="Horas" />
        <DisplayNumber value={minutes} label="Minutos" />
        <DisplayNumber value={seconds} label="Segundos" />
      </div>
    );
  }, [days, hours, minutes, seconds]);

  return (
    <div
      className={`min-h-[50px] ${props.containerPadding || "pt-12 md:pt-20 pb-12"} ${
        dark ? "bg-blackDarken text-white" : "bg-white"
      }`}
    >
      {!disableSponsors && (
        <div className={`${dark ? "bg-blackDarken text-white" : "bg-white"} py-4 mb-12`}>
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center text-xl lg:text-3xl font-bold pt-4 mb-8 md:mb-16">Coorganizadores</div>
            <Sponsors items={sponsorsLists} />
          </div>
        </div>
      )}

      <div
        className={`${props.titleAlignment || "text-center"} text-xl lg:text-3xl font-bold ${
          props.titlePadding || "pt-4"
        } ${props.titleMargin || "mb-8 md:mb-16"}`}
      >
        {title}
      </div>
      {displayContent}
    </div>
  );
});

const CountdownComponent = (props) => {
  const [deadline] = useGlobal("deadline");

  if (!deadline) return spinLoaderMin();

  return <Countdown deadline={deadline} {...props} />;
};

export default CountdownComponent;
