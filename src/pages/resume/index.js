import React from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import { VideoList } from "./VideoList";

const videos = [
  {
    title: (
      <>
        POLÍTICAS PÚBLICAS
        <br />
        Miércoles 8, 6:00 - 9:00 PM
        <br />
        BLOQUE 1
      </>
    ),
    videoId: "2192101",
  },
];

export const Resume = (props) => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-content bg-no-repeat bg-cover">
      <div className="min-h-[calc(100vh-100px)] grid grid-rows-[min-content_auto]">
        <div className="flex flex-col">
          <div className="py-2 lg:min-h-[150px]">
            <div className="text-md lg:text-4xl font-bold uppercase my-2">
              <span className="bg-white/[.80] inline-block px-8">
                I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL
              </span>
            </div>
            <div className="text-md lg:text-2xl font-bold uppercase inline-block">
              <span className="bg-white/[.80] inline-block px-8">
                <Image
                  className="inline-block"
                  src={`${config.storageUrl}/resources/film.svg`}
                  width="18px"
                  desktopWidth="24px"
                />{" "}
                VIDEOS TRANSMITIDOS
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <VideoList videos={videos} />
        </div>
      </div>
    </div>
  );
};
