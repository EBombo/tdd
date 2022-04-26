import React, { useEffect } from "reactn";
import { useRouter } from "next/router";
import {config} from "../firebase";
import {Image} from "./common/Image";

// TODO: Implement Navbar
const Navbar = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/library");
    router.prefetch("/library/events");
    router.prefetch("/events/[eventId]");
  }, []);

  return (
    <div className="bg-whiteDark">
      <nav className="h-[50px] flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Image
            src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
            width="125px"
            height="35px"
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
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
              Inicio
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
              Programa
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white">
              Expositores
            </a>
          </div>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Adquirir entrada</a>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Iniciar sesión</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

