import React from "reactn";
import { useRouter } from "next/router";
import { config } from "../firebase";
import { Image } from "./common/Image";

// TODO: Implement Navbar
const Navbar = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="h-[100px] px-4 flex items-center justify-between bg-whiteDark">
        <div>
          <Image
            src={`${config.storageUrl}/resources/ebombo-icon.png`}
            width="125px"
            height="35px"
            size="contain"
            margin="0"
          />
        </div>
      </div>
      <div className="min-h-[100vh]">
        <div className="w-[100wv] min-h-[calc(100vh-100px)] flex-auto grid">{props.children}</div>
        {/*<Footer />*/}
      </div>
    </>
  );
};

export default Navbar;
