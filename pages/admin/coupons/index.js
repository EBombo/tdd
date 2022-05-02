// import dynamic from "next/dynamic";
// import { spinLoader } from "../../../src/components/common/loader";
import { PrivateRoutes } from "../../../src/routes/PrivateRoutes";
import { Coupons } from "../../../src/pages/admin/coupons";
import Navbar from "../../../src/components/Navbar";

// const UserLayout = dynamic(() => import("../../../src/components/UserLayout"), {
//   ssr: false,
//   loading: () => spinLoader(),
// });

const CouponsContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <Coupons {...props} />;
      </Navbar>
    </PrivateRoutes>
  );
};

export default CouponsContainer;
