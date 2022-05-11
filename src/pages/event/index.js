import React from "reactn";

// TODO replace iframe
const eventUrl = "https://html.spec.whatwg.org/";

export const Event = (props) => {
  return (
    <>
      <div className="m-0 sm:px-1 min-h-screen w-full bg-register bg-no-repeat bg-cover bg-bottom flex flex-col justify-center">
        <iframe
          src={eventUrl}
          frameBorder="0"
          className="min-h-screen"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};
