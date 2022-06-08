import React, { useState } from "reactn";
import { Tooltip } from "antd";
import styled from "styled-components";
import { config, firestore } from "../../firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Desktop, Tablet } from "../../constants";

const eventUrl = `https://storage.net-fs.com/hosting/7319004/0/`;

export const Event = (props) => {
  const router = useRouter();

  const [eventLink, setEventLink] = useState(eventUrl);
  const [forceRender, setForceRender] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    router.prefetch("/resume");
    router.prefetch("/timeline");
  }, []);

  useEffect(() => {
    const fetchSchedule = () =>
      firestore
        .collection("settings")
        .doc("schedule")
        .onSnapshot((querySnapshotStartDate) => {
          const schedule = querySnapshotStartDate.data();

          if (!schedule?.message) return setMessage(null);

          setMessage(schedule.message);
        });

    const sub = fetchSchedule();
    return () => sub && sub();
  }, []);

  useEffect(() => {
    if (!message) return;

    props.showNotification("NOTA:", message, "success");
  }, [message]);

  return (
    <div className="flex">
      {message && <CountDown>{message}</CountDown>}

      <Desktop>
        <Tooltip title="Informacón del evento" placement="left">
          <FloatIcon {...props} top="15px" onClick={() => router.push("/timeline")} icon="info-icon.png">
            <div className="icon" />
          </FloatIcon>
        </Tooltip>

        <Tooltip title="Videos transmitidos" placement="left">
          <FloatIcon {...props} top="65px" onClick={() => router.push("/resume")} icon="video-icon.png">
            <div className="icon" />
          </FloatIcon>
        </Tooltip>

        <Tooltip title="Ir a la entrada del evento" placement="left">
          <FloatIcon
            {...props}
            icon="home-icon.svg"
            top="115px"
            onClick={() => {
              setEventLink(eventUrl);
              setForceRender(forceRender + 1);
            }}
          >
            <div className="icon" />
          </FloatIcon>
        </Tooltip>
      </Desktop>

      <Tablet>
        <Tooltip title="Informacón del evento" placement="left">
          <FloatIcon {...props} top="115px" onClick={() => router.push("/timeline")} icon="info-icon.png">
            <div className="icon" />
          </FloatIcon>
        </Tooltip>

        <Tooltip title="Videos transmitidos" placement="left">
          <FloatIcon {...props} top="165px" onClick={() => router.push("/resume")} icon="video-icon.png">
            <div className="icon" />
          </FloatIcon>
        </Tooltip>

        <Tooltip title="Ir a la entrada del evento" placement="left">
          <FloatIcon
            {...props}
            icon="home-icon.svg"
            top="215px"
            onClick={() => {
              setEventLink(eventUrl);
              setForceRender(forceRender + 1);
            }}
          >
            <div className="icon" />
          </FloatIcon>
        </Tooltip>
      </Tablet>

      <iframe
        src={eventLink}
        key={forceRender}
        className="min-h-screen w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const FloatIcon = styled.div`
  right: 0;
  width: 50px;
  height: 40px;
  display: flex;
  z-index: 99999;
  position: fixed;
  cursor: pointer;
  padding-left: 5px;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 3px 2px ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.basic.white};
  ${(props) => (props.top ? `top: ${props.top};` : "top: 80px;")}

  .icon {
    width: 30px;
    height: 30px;
    margin: auto 0;
    background-size: contain;
    background-image: url(${(props) => `${config.storageUrl}/resources/event/${props.icon}`});
  }
`;

const CountDown = styled.div`
  top: 0;
  left: 50%;
  z-index: 99999;
  font-size: 10px;
  padding: 0 10px;
  position: fixed;
  margin-left: -100px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.basic.white};
`;
