import React from "reactn";
import { Image } from "./common/Image";
import chunk from "lodash/chunk";

export const Sponsors = ({ items }) => {
  return chunk(items, 4).map((itemsChunked, index) => (
    <div
      className={`grid grid-cols-${itemsChunked.length === 1 ? "1" : "2"} md:grid-cols-${
        itemsChunked.length
      } gap-4 lg:gap-8 mx-4 my-4`}
      key={`items-chunked-${index}`}
    >
      {itemsChunked.map((item, i) => (
        <Image height="50px" desktopHeight="70px" size="contain" src={item.imageUrl} key={`sponsor-img-${i}`} />
      ))}
    </div>
  ));
};
