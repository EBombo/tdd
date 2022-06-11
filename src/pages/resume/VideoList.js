import React from "reactn";
import { Anchor } from "../../components/form";

// In case it is needed to put back.
// <Anchor url={`https://vimeo.com/event/${video.videoId}`} target="_blank" key={`video-list-item-${i}`}>
// </Anchor>

export const VideoList = React.memo((props) => {
  return (
    <div className="bg-blackDarken py-4 px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 h-full overflow-auto ">
      {props.videos.map((video, i) => (
        <div className="mt-2 mb-8" key={`video-list-item-${i}`}>
          <div className=" min-w-[100px] lg:h-auto overflow-hidden rounded-xl cursor-pointer">
            <iframe
              id="video"
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="0"
              allowFullScreen=""
              allow="fullscreen; picture-in-picture"
              src={`https://vimeo.com/event/${video.videoId}/embed`}
            />
          </div>
          <div className="text-white text-base my-2">{video.title}</div>
        </div>
      ))}
    </div>
  );
});
