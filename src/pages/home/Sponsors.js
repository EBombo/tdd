import React from "reactn";
import { Image } from "../../components/common/Image";

export const Sponsors = ({ items }) => {
  return (
    <div className="grid grid-cols-2 lg:grid lg:grid-cols-4 gap-4 lg:gap-8 mx-4">
      {items.map((item, i) => (
        <Image
          width="105px"
          height="66px"
          desktopWidth="155px"
          desktopHeight="106px"
          size="contain"
          src={item.imageUrl}
          key={`sponsor-img-${i}`}
        />
      ))}
    </div>
  );
};
