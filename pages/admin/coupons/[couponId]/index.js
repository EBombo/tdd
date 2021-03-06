import { PrivateRoutes } from "../../../../src/routes/PrivateRoutes";
import { CouponForm } from "../../../../src/pages/admin/coupons/_couponId";
import Navbar from "../../../../src/components/Navbar";

const CouponsContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <CouponForm {...props} />
      </Navbar>
    </PrivateRoutes>
  );
};

export default CouponsContainer;
