import { PrivateRoutes } from "../../../../src/routes/PrivateRoutes";
import { User } from "../../../../src/pages/admin/users/_userId";
import Navbar from "../../../../src/components/Navbar";

const UsersContainer = (props) => {
  return (
    <PrivateRoutes>
      <Navbar>
        <User {...props} />
      </Navbar>
    </PrivateRoutes>
  );
};

export default UsersContainer;


