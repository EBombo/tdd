import React, { useGlobal } from "reactn";
import Countdown from "../../components/Countdown";
import { timelineBlocks } from "../../components/common/DataList";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import { Anchor } from "../../components/form";

export const Timeline = (props) => {
  const [authUser] = useGlobal("user");

  return (
    <div>
      <div className="w-full bg-timeline bg-no-repeat bg-center bg-cover max-h-[115px] h-[30vh] md:max-h-[368px] p-4 md:p-8 relative">
        <div className="p-8 md:px-12 md:py-8 bg-white/[.60] absolute top-[50%] left-0 translate-y-[-50%] flex gap-[10px]">
          <Image
            src={`${config.storageUrl}/resources/calendar.svg`}
            height="23px"
            width="23px"
            desktopHeight="45px"
            desktopWidth="45px"
            size="contain"
            margin="0"
          />
          <div className="text-['Encode Sans'] text-blackDarken text-[20px] font-[800] leading-[25px]  md:text-[40px] md:leading-[44px] uppercase">
            Programa
          </div>
        </div>
      </div>

      <Countdown />

      <div className="bg-whiteDark p-4 md:p-8">
        {timelineBlocks.map((block, index) => (
          <div className="rounded-[8px] bg-white shadow-[0_0_37px_rgba(0,0,0,0.15)] p-2 my-4 md:p-4 md:my-8 md:p-4 max-w-[1500px] mx-auto">
            <div className="flex items-center rounded-[8px] gap-[20px] md:translate-x-[-2rem] translate-x-[-1rem]">
              <div
                className={`p-4 md:p-8 rounded-[8px] uppercase font-[600] text-['Encode Sans'] text-white text-[20px] leading-[25px] md:text-[40px] md:leading-[45px]`}
                style={{ background: block.color }}
              >
                {block.name}
              </div>
              <div className="p-4 md:p-8 rounded-[8px] bg-gray text-white font-[600] text-['Encode Sans'] text-[20px] leading-[25px] md:text-[40px] md:leading-[45px]">
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
                      <Anchor url={exhibitor.linkedin}>
                        <Image
                          src={`${config.storageUrl}/resources/linkedin-${block.color}.svg`}
                          width="18px"
                          height="18px"
                          desktopWidth="34px"
                          desktopHeight="34px"
                          size="contain"
                          margin="0"
                        />
                      </Anchor>
                      <Anchor url={exhibitor.twitter}>
                        <Image
                          src={`${config.storageUrl}/resources/twitter-${block.color}.svg`}
                          width="18px"
                          height="18px"
                          desktopWidth="34px"
                          desktopHeight="34px"
                          size="contain"
                          margin="0"
                        />
                      </Anchor>
                      <Anchor url={exhibitor.website}>
                        <Image
                          src={`${config.storageUrl}/resources/website-${block.color}.svg`}
                          width="18px"
                          height="18px"
                          desktopWidth="34px"
                          desktopHeight="34px"
                          size="contain"
                          margin="0"
                        />
                      </Anchor>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {block.commentators && (
              <div className="flex flex-col gap-[10px] my-[40px]">
                <div className="text-['Encode Sans'] font-[500] text-[14px] leading-[18px] md:text-[30px] md:leading-[34px]">
                  Comentaristas:
                </div>
                <div className="text-['Encode Sans'] font-[700] text-[14px] leading-[18px] md:text-[30px] md:leading-[34px]">
                  {block.commentators}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
