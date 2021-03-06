import React, { useState } from "reactn";
import Countdown from "../../components/Countdown";
import { timelineBlocks } from "../../components/common/DataList";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import { Anchor } from "../../components/form";

export const Timeline = (props) => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="w-full bg-timeline bg-no-repeat bg-center bg-cover max-h-[240px] h-[40vh] md:max-h-[368px] py-4 md:py-8 relative">
        <div className="grid lg:grid-cols-[auto_300px] gap-4">
          <div className="grid gap-4">
            <div className="text-blackDarken text-[20px] font-[800] leading-[25px] lg:text-[36px] lg:leading-[44px] uppercase bg-white/[.80]">
              <span className="pl-4 py-4 inline-block">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</span>
            </div>

            <div className="py-4 lg:pr-12 lg:py-4 flex gap-[10px] text-[24px] uppercase font-bold">
              <span className="bg-white/[.80] pl-4 py-4">
                <Image
                  className="inline-block"
                  src={`${config.storageUrl}/resources/calendar.svg`}
                  height="24px"
                  width="24px"
                  desktopHeight="32px"
                  desktopWidth="32px"
                  size="contain"
                  margin="0"
                />
                <span className="align-top px-2">Programa</span>
              </span>
            </div>
          </div>
          <div className="bg-white/[.80] hidden lg:block">
            <Image src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`} width="80%" />
          </div>
        </div>
      </div>

      <Countdown />

      <div className="bg-white p-4 md:px-24">
        <div className="flex items-center gap-[5px] md:gap-[10px]">
          {timelineBlocks.map((block, index) => (
            <div
              key={index}
              className={`text-white text-['Encode Sans'] text-[12px] leading-[15px] md:text-[16px] md:leading-[20px] p-2 md:py-4 md:pr-12 ${
                index === tab ? "bg-primary" : "bg-gray"
              } rounded-tl-[10px] rounded-tr-[10px] cursor-pointer`}
              onClick={() => setTab(index)}
            >
              {block.name}
            </div>
          ))}
        </div>

        {timelineBlocks.map((block, index) => (
          <div
            className={`rounded-[8px] bg-white shadow-[0_0_37px_rgba(0,0,0,0.15)] p-2 mb-4 md:p-12 md:mb-12 max-w-[1500px] mx-auto ${
              index === tab ? "blocK" : "hidden"
            }`}
            key={`${block.name}-${index}`}
          >
            <div className="flex items-center rounded-[8px] gap-[20px] md:translate-x-[-4rem] translate-x-[-1rem]">
              <div
                className={`p-4 md:px-8 rounded-[8px] uppercase font-[600] text-['Encode Sans'] text-white text-[20px] leading-[25px] md:text-[30px] md:leading-[35px]`}
                style={{ background: block.color }}
              >
                {block.name}
              </div>
              <div className="p-4 md:px-8 rounded-[8px] bg-gray text-white font-[600] text-['Encode Sans'] text-[20px] leading-[25px] md:text-[30px] md:leading-[35px]">
                {block.date}
              </div>
            </div>

            <div
              className={`uppercase text-['Encode Sans'] font-[800] text-[18px] leading-[22px] md:text-[30px] md:leading-[34px] my-4 md:my-8`}
              style={{ color: block.color }}
            >
              {block.title}
            </div>

            <div className="text-['Encode Sans'] text-[13px] leading-[16px] md:text-[20px] md:leading-[22px]">
              {block.description}
            </div>

            <div className="h-[3px] w-[70%] rounded-[8px] mt-8 mb-12" style={{ background: block.color }} />

            {block.exhibitors.map((exhibitor) => (
              <div className="mb-[40px]">
                <div
                  className="text-['Encode Sans'] font-[700] text-[14px] leading-[18px] md:text-[30px] md:leading-[34px] mb-4"
                  style={{ color: block.color }}
                >
                  {exhibitor.subtitle}
                </div>

                <div className="grid grid-cols-[80px_auto] md:grid-cols-[150px_auto] gap-4">
                  <Image
                    src={exhibitor.imageUrl}
                    width="80px"
                    height="80px"
                    desktopWidth="150px"
                    desktopHeight="150px"
                    size="contain"
                    margin="0"
                    borderRadius="8px"
                  />

                  <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src={`${config.storageUrl}/resources/${exhibitor.country}.svg`}
                        width="20px"
                        height="15px"
                        desktopWidth="40px"
                        desktopHeight="26px"
                        size="contain"
                        margin="0"
                        borderRadius="8px"
                      />
                      <div className="text-['Encode Sans'] text-black font-[700] text-[14px] leading-[18px] md:text-[25px] md:leading-[28px]">
                        {exhibitor.name}
                      </div>
                    </div>
                    <div className="text-['Encode Sans'] text-black font-[500] text-[12px] leading-[15px] md:text-[25px] md:leading-[28px]">
                      {exhibitor.title}
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Anchor url={exhibitor.linkedin} target="_blank">
                        <Image
                          src={`${config.storageUrl}/resources/linkedin-${block.colorName}.svg`}
                          width="18px"
                          height="18px"
                          desktopWidth="34px"
                          desktopHeight="34px"
                          size="contain"
                          cursor="pointer"
                          margin="0"
                        />
                      </Anchor>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {block.commentators && (
              <>
                <div className="flex items-center rounded-[8px] gap-[20px] md:translate-x-[-4rem] translate-x-[-1rem]">
                  <div
                    className={`py-2 px-12 md:py-4 rounded-[8px] font-[500] text-['Encode Sans'] text-white text-[15px] leading-[20px] md:text-[30px] md:leading-[35px]`}
                    style={{ background: block.color }}
                  >
                    Comentaristas
                  </div>
                </div>

                <div className="grid justify-center my-8 gap-4 md:grid-cols-[repeat(3,1fr)]">
                  {block.commentators.map((commentator) => (
                    <div className="shadow-[0_0_37px_rgba(0,0,0,0.15)] rounded-[8px] bg-white p-4 md:w-full md:max-w-[450px] grid grid-cols-[60px_auto] items-center md:grid-cols-[80px_auto] gap-[5px]">
                      <Image
                        src={commentator.imageUrl}
                        width="60px"
                        height="60px"
                        desktopWidth="80px"
                        desktopHeight="80px"
                        size="contain"
                        margin="0"
                        borderRadius="8px"
                      />

                      <div className="flex flex-col justify-between items-start h-full">
                        <div className="text-['Encode Sans'] font-[700] text-[10px] leading-[12px] md:text-[14px] md:leading-[16px] text-black">
                          {commentator.name}
                        </div>
                        <div className="text-['Encode Sans'] font-[500] text-[10px] leading-[12px] md:text-[12px] md:leading-[14px] text-black">
                          {commentator.title}
                        </div>
                        <div>
                          <Anchor url={commentator.linkedin} target="_blank">
                            <Image
                              src={`${config.storageUrl}/resources/linkedin-${block.colorName}.svg`}
                              width="12px"
                              height="12px"
                              desktopWidth="20px"
                              desktopHeight="20px"
                              size="contain"
                              margin="0"
                            />
                          </Anchor>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
