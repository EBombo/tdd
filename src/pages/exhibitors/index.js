import React, { useEffect, useState } from "reactn";
import { Image } from "../../components/common/Image";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { Anchor, Button } from "../../components/form";
import { Input } from "antd";
import { timelineBlocks } from "../../components/common/Datalist";
import orderBy from "lodash/orderBy";
import isEmpty from "lodash/isEmpty";

export const Exhibitors = (props) => {
  const [exhibitors, setExhibitors] = useState([]);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    sortUsers();
  }, []);

  const sortUsers = () => {
    const _exhibitors = [];

    timelineBlocks.map((block) => _exhibitors.push(...block.exhibitors));

    const sortedExhibitors = orderBy(_exhibitors, ["name"], [order]);

    setExhibitors(sortedExhibitors);
  };

  const reverseOrder = () => {
    setExhibitors(orderBy(exhibitors, ["name"], order === "asc" ? "desc" : "asc"));
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const searchUser = (value) => {
    if (isEmpty(value)) return sortUsers();

    const filterUsers = exhibitors.map((exhibitor) => {
      if (exhibitor.name.toLowerCase().includes(value)) return exhibitor;
    });

    setExhibitors(filterUsers.filter((user) => user !== undefined));
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
            {order === "asc" ? "Ordenar Z-A" : "Ordenar A-Z"}
          </Button>
          <div className="w-[300px]">
            <Input.Search placeholder="Buscar" onSearch={searchUser} />
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
              <div className="p-2 flex flex-col justify-between">
                <div>
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

                <div className="flex">
                  <Anchor url={exhibitor.linkedin}>
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
                </div>
              </div>
            </div>
          ))}

          {limit <= exhibitors.length && (
            <div className="w-full flex justify-center my-8">
              <Button primary onClick={() => setLimit(limit + 3)} margin="m-0">
                Ver más
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
