import React, { useGlobal, useMemo } from "reactn";
import useCountdown from "../hooks/useCountdown";
import { spinLoaderMin } from "./common/loader";
import { Sponsors } from "./Sponsors";
import { sponsorsLists } from "./common/DataList";
import moment from "moment";
import { useState } from "react";
import { Button } from "./form";
import { useRouter } from "next/router";

const DisplayNumber = React.memo(({ value, label, scale }) => (
  <span className={`mx-0 ${scale ? "mx-2" : "lg:mx-8"}`}>
    <div
      className={`${
        scale ? "text-3xl" : "min-w-[80px] lg:min-w-[90px] text-4xl lg:text-5xl"
      } font-bold text-center mb-3`}
    >
      {value}
    </div>
    <div className={`${scale ? "" : "text-md lg:text-4xl "}text-pink-500 text-center`}>{label}</div>
  </span>
));

const CountdownComponent = ({ title = "Reserva la fecha", disableSponsors, disableTitle, dark, scale, ...props }) => {
  const router = useRouter();

  const [deadline] = useGlobal("deadline");
  const [serverDate] = useGlobal("serverDate");

  const [eventIsLive] = useState(moment(deadline).isBefore(serverDate));

  const [days, hours, minutes, seconds] = useCountdown(deadline);

  const displayContent = useMemo(() => {
    if (deadline === null || days + hours + minutes + seconds <= 0)
      return (
        <div className="flex items-center justify-center">
          <DisplayNumber value={0} label="Días" scale={scale} />
          <DisplayNumber value={0} label="Horas" scale={scale} />
          <DisplayNumber value={0} label="Minutos" scale={scale} />
          <DisplayNumber value={0} label="Segundos" scale={scale} />
        </div>
      );

    return (
      <div className="flex items-center justify-center">
        <DisplayNumber value={days} label="Días" scale={scale} />
        <DisplayNumber value={hours} label="Horas" scale={scale} />
        <DisplayNumber value={minutes} label="Minutos" scale={scale} />
        <DisplayNumber value={seconds} label="Segundos" scale={scale} />
      </div>
    );
  }, [days, hours, minutes, seconds]);

  if (!deadline) return spinLoaderMin();

  /**
   * The event is live.
   * **/
  if (eventIsLive)
    return (
      <div className={`text-center ${disableSponsors ? "" : "bg-blackDarken py-12"}`}>
        {!disableSponsors && <p className="text-primary text-4xl font-bold px-10 py-4">¡El evento ya empezó!</p>}

        <Button
          primary
          margin="mx-auto mb-4"
          fontSize={disableSponsors ? "text-base" : "text-2xl"}
          onClick={() => router.push("/event")}
        >
          Unirse al evento
        </Button>
      </div>
    );

  return (
    <div
      className={`min-h-[50px] ${props.containerPadding || "pt-12 md:pt-20 pb-12"} ${
        dark ? "bg-blackDarken text-white" : ""
      } `}
    >
      {!disableSponsors && (
        <div className={`${dark ? "bg-blackDarken text-white" : "bg-white"} py-4 mb-12`}>
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center text-xl lg:text-3xl font-bold pt-4 mb-8 md:mb-16">Coorganizadores</div>
            <Sponsors items={sponsorsLists} />
          </div>
        </div>
      )}

      {!disableTitle && (
        <div
          className={`${props.titleAlignment || "text-center"} ${scale ? "" : "text-xl lg:text-3xl"} font-bold ${
            props.titlePadding || "pt-4"
          } ${props.titleMargin || "mb-8 md:mb-16"}`}
        >
          {title}
        </div>
      )}

      {displayContent}
    </div>
  );
};

export default CountdownComponent;
