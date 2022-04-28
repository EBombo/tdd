import React from "reactn";
import { Image } from "../../components/common/Image";

export const Sponsors = ({ items }) => {
  return (
    <div className="grid grid-cols-2 lg:grid lg:grid-cols-4 gap-4 lg:gap-8 mx-4">
      {items.map((item, i) => (
        <Image key={`sponsor-img-${i}`} src={item.imageUrl} />
      ))}
    </div>
  );
};
