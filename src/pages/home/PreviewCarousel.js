import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { Anchor } from "../../components/form";
import { config } from "../../firebase";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const PreviewCarousel = ({ items, ...props }) => {
  const size = items.length;

  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!items && size === 0) return;

    setSelected(items[0]);
  }, [items]);

  useEffect(() => {
    setSelected(items[selectedIndex]);
  }, [selectedIndex]);

  const next = () => {
    setSelectedIndex((oldValue) => (oldValue + 1) % size);
  };

  const prev = () => {
    if (selectedIndex - 1 < 0) {
      setSelectedIndex(size - 1);
    }

    setSelectedIndex((oldValue) => (oldValue - 1) % size);
  };

  return (
    <div className="w-full">
      <div className="p-4 my-8 rounded-[8px] grid gap-4 shadow-[0_0_37px_rgba(0,0,0,0.15)] mx-auto max-w-[320px] md:max-w-[1100px] md:grid-cols-[325px_auto] md:p-8">
        <Image
          src={selected?.imageUrl}
          width="265px"
          height="265px"
          desktopHeight="300px"
          desktopWidth="300px"
          size="cover"
          margin="0 auto"
          borderRadius="8px"
        />
        <div className="p-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center md:justify-between md:flex-row">
              <div className="text-['Encode Sans'] text-black font-[700] text-[20px] leading-[25px] md:text-[30px] md:leading-[35px]">
                {selected?.name}
              </div>

              <div className="hidden md:block">
                <Image
                  src={`${config.storageUrl}/resources/${selected?.country}.svg`}
                  width="60px"
                  height="40px"
                  size="contain"
                  margin="0"
                  borderRadius="8px"
                />
              </div>
            </div>

            <div className="py-4 text-['Encode Sans'] text-black font-[400] text-[14px] leading-[18px] md:text-[20px] md:leading-[25px]">
              {selected?.title}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Anchor url={selected?.linkedin}>
              <Image
                src={`${config.storageUrl}/resources/linkedin-primary.svg`}
                width="40px"
                height="40px"
                size="contain"
                margin="0"
                borderRadius="8px"
                cursor="pointer"
              />
            </Anchor>
            <div className="block md:hidden">
              <Image
                src={`${config.storageUrl}/resources/${selected?.country}.svg`}
                width="40px"
                height="30px"
                size="contain"
                margin="0"
                borderRadius="8px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 flex items-center justify-center gap-4">
        <div className="self-center">
          <div
            className="flex justify-center items-center bg-pink-500 p-2 rounded-lg cursor-pointer"
            onClick={() => prev()}
          >
            <LeftOutlined className="text-white" />
          </div>
        </div>
        <div className={`flex gap-4 justify-center overflow-hidden`}>
          {items
            .concat(items)
            .slice(items.length - 1 + selectedIndex - 1, items.length + selectedIndex)
            .concat(items.concat(items).slice(selectedIndex, selectedIndex + 3))
            .map((exhibitor, index) => (
              <span key={`${exhibitor.name}-${index}`}>
                <Image
                  className={`inline-block rounded-xl ${
                    exhibitor.name === selected?.name ? `border-primary border-2` : "opacity-50"
                  }`}
                  width="80px"
                  height="80px"
                  desktopHeight="100px"
                  desktopWidth="100px"
                  src={exhibitor.imageUrl}
                />
              </span>
            ))}
        </div>
        <div className="self-center">
          <div
            className="flex justify-center items-center bg-pink-500 p-2 rounded-lg cursor-pointer"
            onClick={() => next()}
          >
            <RightOutlined className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
