import { PrivateRoutes } from "../../../src/routes/PrivateRoutes";
import { Coupons } from "../../../src/pages/admin/coupons";
import Navbar from "../../../src/components/Navbar";

const CouponsContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <Coupons {...props} />
      </Navbar>
    </PrivateRoutes>
  );
};

export default CouponsContainer;
