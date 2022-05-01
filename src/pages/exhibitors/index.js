import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { Button, Input } from "../../components/form";
import { timelineBlocks } from "../../components/common/Datalist";
import orderBy from "lodash/lodash";

export const Exhibitors = (props) => {
  const [exhibitors, setExhibitors] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const _exhibitors = [];

    timelineBlocks.map((block) => _exhibitors.push(...block.exhibitors));

    const ordenamiento = orderBy(_exhibitors, ["name"], ["asc"]);

    console.log(_exhibitors, ordenamiento);

    setExhibitors(ordenamiento);
  }, []);

  const reverseOrder = () => {
    setExhibitors(orderBy(exhibitors, ["name", "desc"]));
  };

  return (
    <div>
      <div className="w-full bg-exhibitors bg-no-repeat bg-center bg-cover max-h-[115px] h-[30vh] md:max-h-[368px] p-4 md:p-8 relative">
        <div className="p-8 md:px-12 md:py-8 bg-white/[.60] absolute top-[50%] left-0 translate-y-[-50%] flex gap-[10px]">
          <Image
            src={`${config.storageUrl}/resources/podium.svg`}
            height="23px"
            width="23px"
            desktopHeight="45px"
            desktopWidth="45px"
            size="contain"
            margin="0"
          />
          <div className="text-['Encode Sans'] text-blackDarken text-[20px] font-[800] leading-[25px]  md:text-[40px] md:leading-[44px] uppercase">
            Expositores
          </div>
        </div>
      </div>

      <Countdown />

      <div className="bg-white max-w-[1500px] mx-auto p-4 md:p-8">
        <div className="flex items-center flex-col gap-[10px] md:flex-row md:justify-between">
          <Button margin="m-0" onClick={() => reverseOrder()}>
            Ordenar Z-A
          </Button>
          <div className="w-[300px]">
            <Input type="search" placeholder="Buscar" />
          </div>
        </div>

        <div>
          {exhibitors.slice(0, limit).map((exhibitor, index) => (
            <div
              key={`${exhibitor.name}-${index}`}
              className="p-4 my-8 rounded-[8px] grid gap-4 shadow-[0_0_37px_rgba(0,0,0,0.15)] mx-auto max-w-[320px] md:max-w-[1200px] md:grid-cols-[325px_auto] md:p-8"
            >
              <Image
                src={exhibitor.imageUrl}
                width="265px"
                height="265px"
                desktopHeight="325px"
                desktopWidth="325px"
                size="cover"
                margin="0 auto"
                borderRadius="8px"
              />
              <div className="p-2">
                <div className="flex items-center md:justify-between md:flex-row">
                  <div className="text-['Encode Sans'] text-black font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[52px]">
                    {exhibitor.name}
                  </div>

                  <div className="hidden md:block">
                    <Image
                      src={`${config.storageUrl}/resources/${exhibitor.country}.svg`}
                      width="60px"
                      height="40px"
                      size="contain"
                      margin="0"
                      borderRadius="8px"
                    />
                  </div>
                </div>

                <div className="py-4 text-['Encode Sans'] text-black font-[400] text-[14px] leading-[18px] md:text-[25px] md:leading-[30px]">
                  {exhibitor.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
