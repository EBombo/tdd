import React from "reactn";

// TODO replace iframe
const videoId = "m3cmEq3jRVk";
const eventUrl = `https://www.youtube.com/embed/${videoId}`;
const host = "localhost";

export const Event = (props) => {
  return (
    <div className="flex">
      <iframe
        className="min-h-screen w-full"
        src="https://storage.net-fs.com/hosting/7319004/0/"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/*
      <iframe
        src={eventUrl}
        className="min-h-screen w-[70%]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <iframe
        className="min-h-screen w-[30%]"
        src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${host}`}
      />
      */}
    </div>
  );
};
