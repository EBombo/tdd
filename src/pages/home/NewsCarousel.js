
import React, { useState, useEffect } from "reactn";
import { Image } from "../../components/common/Image";

export const NewsCarousel = ({ items, ...props }) => {

  const size = items?.length || 0;

  const [ selected, setSelected ] = useState(null);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  useEffect(() => {
    if (!items && size === 0) return;

    setSelected(items[0]);
  }, [items]);

  useEffect(() => {
    setSelected(items[currentIndex]);
  }, [currentIndex]);

  // const next = () => { setSelectedIndex((oldValue) => (oldValue + 1) % size); };
  //
  // const prev = () => { setSelectedIndex((oldValue) => (oldValue - 1) % size); };

  const selectIndex = (i) => { setCurrentIndex(i); };

  const NewsCard = React.memo(({ newItem }) => (
    <div className="relative shadow-lg rounded-lg mt-16 pb-8">
      <div className="h-[214px]"></div>
      <div className="absolute top-[-30px] right-0 w-full">
        <div className="flex justify-center">
          <Image className="inline-block" src={newItem?.imageUrl} width="214px" />
        </div>
      </div>
      <div className="px-8 mb-8 text-center text-lg lg:text-xl font-bold">{newItem?.title}</div>
      <div className="px-8 text-base lg:text-lg"><p>{newItem?.description}</p></div>
    </div>
  ));

  const Dots = React.memo(({ items }) => (
    <>
    {items.map((_, i) => (
      <div className="cursor-pointer w-4 h-4 mx-2 rounded-[50%] bg-pink-500" onClick={() => selectIndex(i)}></div>
    ))}
    </>
  ));

  return (
    <div className="">
      <div className="hidden lg:grid lg:grid-cols-3">
        <div className="m-4"><NewsCard newItem={items[currentIndex % size]} /></div>
        <div className="m-4"><NewsCard newItem={items[(currentIndex + 1) % size]} /></div>
        <div className="m-4"><NewsCard newItem={items[(currentIndex + 2) % size]} /></div>
      </div>
      <div className="block lg:hidden">
        <div className="m-4"><NewsCard newItem={items[currentIndex % size]} /></div>
      </div>

      <div className="flex justify-center">
        <Dots items={items}></Dots>
      </div>
    </div>
  );
};
