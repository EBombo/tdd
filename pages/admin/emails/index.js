import { PrivateRoutes } from "../../../src/routes/PrivateRoutes";
import { Emails } from "../../../src/pages/admin/emails";
import Navbar from "../../../src/components/Navbar";

const EmailsContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <Emails {...props} />
      </Navbar>
    </PrivateRoutes>
  );
};

export default EmailsContainer;
