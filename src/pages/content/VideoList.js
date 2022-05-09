import React from "reactn";
import { Image } from "../../components/common/Image";

  export const VideoList = React.memo((props) => {
    return (
      <div className="bg-blackDarken py-4 min-w-[275px] h-full flex lg:block max-h-[150px] lg:max-h-[calc(100vh-100px)] overflow-auto">
        {props.videos.map((video, i) => (
          <div
            key={`video-list-item-${i}`}
            className="mx-4 mt-2 mb-8 cursor-pointer"
            onClick={() => props.setCurrentVideo(video)}
          >
            <div className="h-[70px] min-w-[100px] lg:h-auto overflow-hidden rounded-xl cursor-pointer">
              <Image src={video.portraitUrl} />
            </div>

            <div className="text-white text-base my-2">{video.title}</div>
          </div>
        ))}
      </div>
    );
  });
