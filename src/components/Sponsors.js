import React from "reactn";
import chunk from "lodash/chunk";
import { Image } from "./common/Image";
import styled from "styled-components";
import { mediaQuery } from "../constants";

export const Sponsors = ({ items }) => {
  return chunk(items, 4).map((itemsChunked, index) => (
    <SponsorsStyled
      size={itemsChunked.length}
      className={`grid gap-4 lg:gap-8 mx-4 my-4`}
      key={`items-chunked-${index}`}
    >
      {itemsChunked.map((item, i) => (
        <Image height="50px" desktopHeight="70px" size="contain" src={item.imageUrl} key={`sponsor-img-${i}`} />
      ))}
    </SponsorsStyled>
  ));
};

const SponsorsStyled = styled.div`
  grid-template-columns: repeat(${(props) => (props.size === 1 ? props.size : "2")}, 1fr);

  ${mediaQuery.afterTablet} {
    grid-template-columns: repeat(${(props) => props.size}, 1fr);
  }
`;
