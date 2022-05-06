import React, { useState } from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { videos } from "../../components/common/DataList";

export const Content = (props) => {

  const [currentVideo, setCurrentVideo] = useState(videos[0]); 

  const VideoList = React.memo(() => {
    return (
      <div className="bg-blackDarken py-4 min-w-[275px] h-full flex lg:block max-h-[150px] lg:max-h-[calc(100vh-100px)] overflow-auto">
       {videos.map((video, i) => 
         <div key={`video-list-item-${i}`} className="mx-4 mt-2 mb-8 cursor-pointer" onClick={() => setCurrentVideo(video)}>
            <div className="h-[70px] min-w-[100px] lg:h-auto overflow-hidden rounded-xl cursor-pointer"><Image src={video.portraitUrl} /></div>
            
            <div className="text-white text-base my-2">{video.title}</div>
         </div>
       )}
      </div>
    );
  });

  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-content bg-no-repeat bg-cover">
      <div className="min-h-[calc(100vh-100px)] grid lg:grid-cols-[auto_400px] grid-rows-[auto_min-content]">
        <div className="flex flex-col">
          <div className="py-2 lg:min-h-[150px]">
            <div className="text-md lg:text-4xl font-bold uppercase my-2">
              <span className="bg-white/[.60] inline-block px-8">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</span>
            </div>
            <div className="text-md lg:text-2xl font-bold uppercase inline-block">
              <span className="bg-white/[.60] inline-block px-8">
                <Image className="inline-block" src={`${config.storageUrl}/resources/film.svg`} width="18px" desktopWidth="24px" /> CONTENIDO
              </span>
            </div>
          </div>

          <div className="bg-white/[.60] h-full">
            <div className="max-w-[1200px] w-full h-full mx-auto flex flex-col">
              <div className="w-[90%] mx-auto pt-4 text-md lg:text-xl font-bold">{currentVideo.title}</div>
              <div className="h-full w-full pt-4 pb-8">
                <iframe className="mx-auto w-full lg:w-[90%]" height="100%" src={currentVideo.embedUrl} title={currentVideo.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>  
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <VideoList />
        </div>
      </div>

      <Countdown />
    </div>
  );
};

