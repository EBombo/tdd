import React from "reactn";
import {config} from "../firebase";
import {Image} from "./common/Image";
import {Anchor} from "./form/Anchor";

// TODO: Implement Navbar
const Footer = (props) => {
  return (
    <div className="bg-whiteDarken py-8">
      <div className="text-grayDarken text-center text-md lg:text-lg mb-8">TRANSFORMACIÓN DIGITAL PARA EL DESARROLLO</div>
      <div className="flex justify-center gap-4">
        <Anchor url="/"><Image src={`${config.storageUrl}/resources/facebook-gray.svg`} /></Anchor>
        <Anchor url="/"><Image src={`${config.storageUrl}/resources/instagram-gray.svg`} /></Anchor>
        <Anchor url="/"><Image src={`${config.storageUrl}/resources/linkedin-gray.svg`} /></Anchor>
        <Anchor url="/"><Image src={`${config.storageUrl}/resources/twitter-gray.svg`} /></Anchor>
      </div>
    </div>
  );
};

export default Footer;
