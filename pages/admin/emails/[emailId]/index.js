import { PrivateRoutes } from "../../../../src/routes/PrivateRoutes";
import { Email } from "../../../../src/pages/admin/emails/_emailId";
import Navbar from "../../../../src/components/Navbar";

const EmailContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <Email {...props} />
      </Navbar>
    </PrivateRoutes>
  );
};

export default EmailContainer;
