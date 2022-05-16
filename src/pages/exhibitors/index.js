import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { Anchor, Button } from "../../components/form";
import { Input } from "antd";
import { timelineBlocks } from "../../components/common/DataList";
import orderBy from "lodash/orderBy";
import isEmpty from "lodash/isEmpty";

export const Exhibitors = (props) => {
  const [exhibitors, setExhibitors] = useState([]);
  const [limit, setLimit] = useState(6);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    sortUsers();
  }, []);

  const sortUsers = () => {
    const _exhibitors = [];

    timelineBlocks.map((block) => _exhibitors.push(...block.exhibitors));

    const sortedExhibitors = orderBy(_exhibitors, ["lastName"], [order]);

    setExhibitors(sortedExhibitors);
  };

  const reverseOrder = () => {
    setExhibitors(orderBy(exhibitors, ["lastName"], order === "asc" ? "desc" : "asc"));
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const searchUser = (value) => {
    if (isEmpty(value)) return sortUsers();

    const filterUsers = exhibitors.filter((exhibitor) => exhibitor.name.toLowerCase().includes(value?.toLowerCase()));

    setExhibitors(filterUsers);
  };

  return (
    <div>
      <div className="w-full bg-timeline bg-no-repeat bg-center bg-cover max-h-[240px] h-[40vh] md:max-h-[368px] py-4 md:py-8 relative">
        <div className="grid lg:grid-cols-[auto_300px] gap-4">
          <div className="grid gap-4">
            <div className="text-blackDarken text-[20px] font-[800] leading-[25px] lg:text-[36px] lg:leading-[44px] uppercase bg-white/[.60]">
              <span className="pl-4 py-4 inline-block">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</span>
            </div>

            <div className="py-4 lg:pr-12 lg:py-4 flex gap-[10px] text-[24px] uppercase font-bold">
              <span className="bg-white/[.60] pl-4 py-4">
                <Image
                  className="inline-block"
                  src={`${config.storageUrl}/resources/podium.svg`}
                  height="24px"
                  width="24px"
                  desktopHeight="32px"
                  desktopWidth="32px"
                  size="contain"
                  margin="0"
                />
                <span className="align-top px-2">Expositores</span>
              </span>
            </div>
          </div>
          <div className="bg-white/[.60] hidden lg:block">
            <Image src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`} width="80%" />
          </div>
        </div>
      </div>

      <Countdown />

      <div className="bg-white max-w-[1500px] mx-auto p-4 md:p-8">
        <div className="flex items-center flex-col gap-[10px] md:flex-row md:justify-between">
          <Button margin="m-0" onClick={() => reverseOrder()}>
            {order === "asc" ? "Ordenar Z-A" : "Ordenar A-Z"}
          </Button>
          <div className="w-[300px]">
            <Input.Search placeholder="Buscar" onSearch={searchUser} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 pt-8">
          {exhibitors.slice(0, limit).map((exhibitor, index) => (
            <div
              key={`${exhibitor.name}-${index}`}
              className="p-4 rounded-[8px] grid gap-4 w-full shadow-[0_0_37px_rgba(0,0,0,0.15)] mx-auto max-w-[320px] md:max-w-[1100px] md:grid-cols-[min-content_auto] md:p-4"
            >
              <Image
                src={exhibitor.imageUrl}
                width="265px"
                height="265px"
                desktopHeight="180px"
                desktopWidth="180px"
                size="cover"
                margin="0 auto"
                borderRadius="8px"
              />
              <div className="p-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center md:justify-between md:flex-row">
                    <div className="text-['Encode Sans'] text-black font-[700] text-[20px] leading-[25px] md:text-[30px] md:leading-[35px]">
                      {exhibitor.name}
                    </div>

                    <div className="hidden md:block">
                      <Image
                        src={`${config.storageUrl}/resources/${exhibitor.country}.svg`}
                        width="30px"
                        height="20px"
                        size="contain"
                        margin="0"
                        borderRadius="8px"
                      />
                    </div>
                  </div>

                  <div className="py-2 text-['Encode Sans'] text-black font-[400] text-[14px] leading-[18px] md:text-[20px] md:leading-[25px]">
                    {exhibitor.title}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Anchor url={exhibitor.linkedin}>
                    <Image
                      src={`${config.storageUrl}/resources/linkedin-primary.svg`}
                      width="32px"
                      height="32px"
                      size="contain"
                      margin="0"
                      borderRadius="8px"
                      cursor="pointer"
                    />
                  </Anchor>
                  <div className="block md:hidden">
                    <Image
                      src={`${config.storageUrl}/resources/${exhibitor.country}.svg`}
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
          ))}
        </div>
        {limit <= exhibitors.length && (
          <div className="w-full flex justify-center my-8">
            <Button primary onClick={() => setLimit(limit + 4)} margin="m-0">
              Ver más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
