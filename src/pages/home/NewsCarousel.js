
import React, { useState, useEffect } from "reactn";
import { Image } from "../../components/common/Image";

export const NewsCarousel = ({ items, ...props }) => {

  const size = items?.length || 0;

  const [ selected, setSelected ] = useState(null);
  const [ selectedIndex, setSelectedIndex ] = useState(0);

  useEffect(() => {
    if (!items && size === 0) return;

    setSelected(items[0]);
  }, [items]);

  useEffect(() => {
    setSelected(items[selectedIndex]);
  }, [selectedIndex]);

  // const next = () => { setSelectedIndex((oldValue) => (oldValue + 1) % size); };
  //
  // const prev = () => { setSelectedIndex((oldValue) => (oldValue - 1) % size); };

  const selectIndex = (i) => { setSelectedIndex(i); };

  const NewsCard = React.memo(({ newItem }) => (
    <div className="relative shadow-lg bg-white">
      <div className="absolute top-[-20px] right-0">
        <Image className="inline-block" url={newItem?.imageUrl} width="214px" />
      </div>
      <div className="text-lg lg:text-xl font-bold"><h1>{newItem?.title}</h1></div>
      <div className="text-base lg:text-lg"><p>{newItem?.description}</p></div>
    </div>
  ));

  const Dots = ({ items, ...props }) => (
    <>
      {items.map((_, i) => (
        <div className="cursor-pointer w-4 w-4 rounded-[50%] bg-pink-500" onClick={() => selectIndex(i)}></div>
      ))}
    </>
  );

  return (
    <div className="">
      <div className="hidden lg:block">
        <div className="m-4"><NewsCard newItem={items[selectIndex % size]} /></div>
        <div className="m-4"><NewsCard newItem={items[(selectIndex + 1) % size]} /></div>
        <div className="m-4"><NewsCard newItem={items[(selectIndex + 2) % size]} /></div>
      </div>
      <div className="block lg:hidden">
        <div className="m-4"><NewsCard newItem={items[selectIndex % size]} /></div>
      </div>

      <div className="flex justify-center">
        <Dots items={items}></Dots>
      </div>
    </div>
  );
};
