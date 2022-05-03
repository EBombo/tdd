import { PrivateRoutes } from "../../../src/routes/PrivateRoutes";
import { Users } from "../../../src/pages/admin/users";
import Navbar from "../../../src/components/Navbar";

const UsersContainer = (props) => {
  return (
    <Navbar>
      <Users {...props} />
    </Navbar>
  );
};

    // <PrivateRoutes>
    // </PrivateRoutes>
export default UsersContainer;

