import React from "reactn";
import { Anchor } from "../../components/form";

export const VideoList = React.memo((props) => {
  return (
    <div className="bg-blackDarken py-4 px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 h-full overflow-auto ">
      {props.videos.map((video, i) => (
        <div key={`video-list-item-${i}`} className="mt-2 mb-8 cursor-pointer">
          <div className=" min-w-[100px] lg:h-auto overflow-hidden rounded-xl cursor-pointer">
            <Anchor url={`https://vimeo.com/event/${video.videoId}`} target="_blank">
              <iframe
                id="video"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                scrolling="no"
                allowFullScreen=""
                src={`https://vimeo.com/event/${video.videoId}/embed`}
              />
            </Anchor>
          </div>

          <div className="text-white text-base my-2">{video.title}</div>
        </div>
      ))}
    </div>
  );
});
