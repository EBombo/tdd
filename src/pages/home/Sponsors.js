import React from "reactn";
import { Image } from "../../components/common/Image";

export const Sponsors = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid lg:grid-cols-6 gap-4 lg:gap-8 mx-4">
      {items.map((item, i) => (
        <Image
          height="30px"
          desktopHeight="50px"
          size="contain"
          src={item.imageUrl}
          key={`sponsor-img-${i}`}
        />
      ))}
    </div>
  );
};
