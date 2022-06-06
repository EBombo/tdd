import React from "reactn";

const eventUrl = `https://storage.net-fs.com/hosting/7319004/0/`;

export const Event = (props) => {
  return (
    <div className="flex">
      <iframe
        className="min-h-screen w-full"
        src={eventUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
