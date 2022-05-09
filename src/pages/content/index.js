import React, { useState } from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { videos } from "../../components/common/DataList";
import { VideoList } from "./VideoList";

export const Content = (props) => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-content bg-no-repeat bg-cover">
      <div className="min-h-[calc(100vh-100px)] grid lg:grid-cols-[auto_280px] grid-rows-[auto_min-content]">
        <div className="flex flex-col">
          <div className="py-2 lg:min-h-[150px]">
            <div className="text-md lg:text-4xl font-bold uppercase my-2">
              <span className="bg-white/[.60] inline-block px-8">
                I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL
              </span>
            </div>
            <div className="text-md lg:text-2xl font-bold uppercase inline-block">
              <span className="bg-white/[.60] inline-block px-8">
                <Image
                  className="inline-block"
                  src={`${config.storageUrl}/resources/film.svg`}
                  width="18px"
                  desktopWidth="24px"
                />{" "}
                CONTENIDO
              </span>
            </div>
          </div>

          <div className="bg-white/[.60] h-full lg:h-[75%]">
            <div className="max-w-[1200px] w-full h-full mx-auto flex flex-col">
              <div className="w-[90%] mx-auto pt-4 text-md lg:text-xl font-bold">{currentVideo.title}</div>
              <div className="h-full w-full pt-4 pb-8">
                <iframe
                  className="mx-auto w-full lg:w-[90%]"
                  height="100%"
                  src={currentVideo.embedUrl}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <VideoList setCurrentVideo={setCurrentVideo} videos={videos} />
        </div>
      </div>

      <Countdown />
    </div>
  );
};
