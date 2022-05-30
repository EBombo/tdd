import React from "reactn";
import { Image } from "./common/Image";

export const Sponsors = ({ items }) => {
  return (
    <div className="grid grid-cols-3 gap-4 lg:gap-8 mx-4 my-8">
      {items.map((item, index) => (
        <Image height="50px" desktopHeight="50px" size="contain" src={item.imageUrl} key={`sponsor-img-${index}`} />
      ))}
    </div>
  );
};
