import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { Button } from "../../components/form";

export const NewsCarousel = ({ items, ...props }) => {
  const size = items?.length || 0;

  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items && size === 0) return;

    setSelected(items[0]);
  }, [items]);

  useEffect(() => {
    setSelected(items[currentIndex]);
  }, [currentIndex]);

  const selectIndex = (i) => {
    setCurrentIndex(i);
  };

  const NewsCard = React.memo(({ newItem }) => (
    <div className="relative h-full shadow-lg rounded-lg pb-16 pt-4">
      <div className="w-full">
        <div className="flex justify-center my-8">
          <Image className="inline-block" src={newItem?.imageUrl} width="214px" />
        </div>
      </div>
      <div className="px-8 mb-8 text-center text-lg lg:text-xl font-bold">{newItem?.title}</div>
      <div className="px-8 text-base lg:text-lg">
        <p>{newItem?.description}</p>
      </div>
      <div className="px-8 text-base lg:text-lg text-center absolute bottom-2 left-0 right-0">
        <Button primary onClick={() => window?.open(newItem?.url, "_blank")}>
          Leer más
        </Button>
      </div>
    </div>
  ));

  const Dots = React.memo(({ items, currentIndex }) => (
    <>
      {items.map((_, i) => {
        const isVisible =
          currentIndex % size === i || (currentIndex + 1) % size === i || (currentIndex + 2) % size === i;

        return (
          <div
            className={`cursor-pointer w-4 h-4 mx-2 rounded-[50%] ${isVisible ? "bg-pink-500" : "bg-gray"}`}
            onClick={() => selectIndex(i)}
            key={i}
          />
        );
      })}
    </>
  ));

  return (
    <div className="">
      <div className="hidden lg:grid lg:grid-cols-3">
        <div className="m-4">
          <NewsCard newItem={items[currentIndex % size]} />
        </div>
        <div className="m-4">
          <NewsCard newItem={items[(currentIndex + 1) % size]} />
        </div>
        <div className="m-4">
          <NewsCard newItem={items[(currentIndex + 2) % size]} />
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="m-4">
          <NewsCard newItem={items[currentIndex % size]} />
        </div>
      </div>

      <div className="flex justify-center my-8">
        <Dots items={items} currentIndex={currentIndex}></Dots>
      </div>
    </div>
  );
};
