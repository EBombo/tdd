import React, { useEffect } from "reactn";
import { useRouter } from "next/router";
import {config} from "../firebase";
import {Image} from "./common/Image";
import {Anchor} from "./form/Anchor";
import {Button} from "./form/Button";

// TODO: Implement Navbar
const Navbar = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/login");
  }, []);

  const LeftAnchor = ({ children, url }) => (
    <Anchor
      className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink-500 mr-8"
      url={url}
    >{children}</Anchor>
  );

  return (
    <div className="bg-whiteTransparent shadow-navbar">
      <nav className="h-[50px] lg:h-[120px] flex items-center justify-between flex-wrap px-4">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Image
            src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
            height="35px"
            desktopHeight="55px"
            size="contain"
            margin="0"
          />
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <LeftAnchor url="/"><span className="text-base">Inicio</span></LeftAnchor>
            <LeftAnchor url="/"><span className="text-base">Programa</span></LeftAnchor>
            <LeftAnchor url="/"><span className="text-base">Expositores</span></LeftAnchor>
          </div>
          <div>
            <Button primary onClick={() => router.push("/")}>Adquirir entrada</Button>
            <Button onClick={() => router.push("/login")}>Iniciar sesión</Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

