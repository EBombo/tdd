import React from "reactn";
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
    <div className="h-[50px] px-4 flex items-center justify-between bg-whiteDark">
      <div>
        <Image
          src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
          width="125px"
          height="35px"
          size="contain"
          margin="0"
        />
      </div>
    </div>
  );
};

export default Navbar;

