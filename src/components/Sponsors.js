import React from "reactn";
import { Image } from "./common/Image";

export const Sponsors = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 mx-4">
      {items.map((item, i) => (
        <Image height="50px" desktopHeight="70px" size="contain" src={item.imageUrl} key={`sponsor-img-${i}`} />
      ))}
    </div>
  );
};
