import React, { useEffect, useState } from "reactn";
import { Image } from "./common/Image";
import { Anchor } from "./form";
import { config } from "../firebase";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const PreviewCarousel = ({ items, ...props }) => {
  const size = items?.length || 0;

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
    setSelectedIndex((oldValue) => (oldValue - 1) % size);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded mx-4 mb-4">
        <div className="lg:grid lg:grid-cols-[1fr_2fr] ">
          <div className="p-4">
            <Image
              className="lg:min-h-[500px]"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
              size="contain"
            />
          </div>
          <div className="py-4">
            <h2 className="px-4 text-xl lg:text-5xl font-bold mb-8">{selected?.name || "Nombre apellido"}</h2>
            <p className="px-4 text-base lg:text-xl mb-8">{selected?.name || "Cargo que tiene y linkedIn"}</p>
            <div className="px-4 py-4">
              <span className="mr-2">
                <Anchor url="/">
                  <Image
                    className="inline-block"
                    src={`${config.storageUrl}/resources/linkedin-pink.svg`}
                    width="24px"
                  />
                </Anchor>
              </span>
              <span className="mx-2">
                <Anchor url="/">
                  <Image
                    className="inline-block"
                    src={`${config.storageUrl}/resources/twitter-pink.svg`}
                    width="24px"
                  />
                </Anchor>
              </span>
              <span className="ml-2">
                <Anchor url="/">
                  <Image
                    className="inline-block"
                    src={`${config.storageUrl}/resources/website-pink.svg`}
                    width="24px"
                  />
                </Anchor>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 grid grid-cols-[min-content_auto_min-content] lg:hidden">
        <div className="self-center">
          <div
            className="flex justify-center items-center bg-pink-500 p-2 rounded-lg cursor-pointer"
            onClick={() => prev()}
          >
            <LeftOutlined className="text-white" />
          </div>
        </div>
        <div className="flex justify-around">
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
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

      <div className="mx-4 hidden lg:grid lg:grid-cols-[min-content_auto_min-content]">
        <div className="self-center">
          <div
            className="flex justify-center items-center bg-pink-500 p-2 rounded-lg cursor-pointer"
            onClick={() => prev()}
          >
            <LeftOutlined className="text-white" />
          </div>
        </div>
        <div className="flex justify-around">
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
          <span>
            <Image
              className="inline-block rounded-xl"
              width="66px"
              src={`${config.storageUrl}/resources/profile-sample.jpg`}
            />
          </span>
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
