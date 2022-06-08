import React, { useState } from "reactn";
import { Tooltip } from "antd";
import styled from "styled-components";
import { config } from "../../firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

const eventUrl = `https://storage.net-fs.com/hosting/7319004/0/`;

export const Event = (props) => {
  const router = useRouter();

  const [eventLink, setEventLink] = useState(eventUrl);
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    router.prefetch("/resume");
  }, []);

  return (
    <div className="flex">
      <Tooltip title="Videos transmitidos" placement="left">
        <FloatIcon {...props} top="15px" onClick={() => router.push("/resume")} icon="video-icon.png">
          <div className="icon" />
        </FloatIcon>
      </Tooltip>

      <Tooltip title="Ir a la entrada del evento" placement="left">
        <FloatIcon
          {...props}
          icon="home-icon.svg"
          top="65px"
          onClick={() => {
            setEventLink(eventUrl);
            setForceRender(forceRender + 1);
          }}
        >
          <div className="icon" />
        </FloatIcon>
      </Tooltip>

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
  background-color: ${(props) => props.theme.basic.primaryLight};
  ${(props) => (props.top ? `top: ${props.top};` : "top: 80px;")}

  .icon {
    width: 30px;
    height: 30px;
    margin: auto 0;
    background-size: contain;
    background-image: url(${(props) => `${config.storageUrl}/resources/event/${props.icon}`});
  }
`;
