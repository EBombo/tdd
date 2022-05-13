import React from "reactn";
import { Image } from "../../components/common/Image";
import { Anchor } from "../../components/form";

export const VideoList = React.memo((props) => {
  return (
    <div className="bg-blackDarken py-4 px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 h-full lg:max-h-[calc(100vh-100px)] overflow-auto ">
      {props.videos.map((video, i) => (
        <div
          key={`video-list-item-${i}`}
          className="mt-2 mb-8 cursor-pointer"
          onClick={() => props.setCurrentVideo(video)}
        >
          <div className=" min-w-[100px] lg:h-auto overflow-hidden rounded-xl cursor-pointer">
            <Anchor url={video.embedUrl} target="_blank">
              <Image className="cursor-pointer" src={video.portraitUrl} />
            </Anchor>
          </div>

          <div className="text-white text-base my-2">{video.title}</div>
        </div>
      ))}
    </div>
  );
});
