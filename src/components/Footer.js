import React from "reactn";
import { config } from "../firebase";
import { Image } from "./common/Image";
import { Anchor } from "./form/Anchor";

// TODO: Implement Navbar
const Footer = (props) => {
  return (
    <div className="bg-whiteDarken py-8">
      <div className="text-grayDarken text-center text-md lg:text-lg mb-8">
        TRANSFORMACIÓN DIGITAL PARA EL DESARROLLO
      </div>
      <div className="flex justify-center gap-8">
        <Anchor url="https://www.facebook.com/tdduni" target="_blank">
          <Image
            src={`${config.storageUrl}/resources/facebook-gray.svg`}
            cursor="pointer"
            size="contain"
            width="30px"
            height="30px"
            desktopWidth="38px"
            desktopHeight="38px"
          />
        </Anchor>
        <Anchor url="https://www.instagram.com/tdduni/" target="_blank">
          <Image
            src={`${config.storageUrl}/resources/instagram-gray.svg`}
            cursor="pointer"
            size="contain"
            width="30px"
            height="30px"
            desktopWidth="38px"
            desktopHeight="38px"
          />
        </Anchor>
        <Anchor url="https://www.linkedin.com/company/tdduni" target="_blank">
          <Image
            src={`${config.storageUrl}/resources/linkedin-gray.svg`}
            cursor="pointer"
            size="contain"
            width="30px"
            height="30px"
            desktopWidth="38px"
            desktopHeight="38px"
          />
        </Anchor>
        <Anchor url="https://twitter.com/tdduni" target="_blank">
          <Image
            src={`${config.storageUrl}/resources/twitter-gray.svg`}
            cursor="pointer"
            size="contain"
            width="30px"
            height="30px"
            desktopWidth="38px"
            desktopHeight="38px"
          />
        </Anchor>
      </div>
    </div>
  );
};

export default Footer;
