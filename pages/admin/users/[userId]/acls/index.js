import { PrivateRoutes } from "../../../../../src/routes/PrivateRoutes";
import { AdminUserAcls } from "../../../../../src/pages/admin/users/_userId/acls";
import Navbar from "../../../../../src/components/Navbar";

const UsersContainer = (props) => {
  return (
    <Navbar>
      <AdminUserAcls {...props} />
    </Navbar>
  );
};

    // <PrivateRoutes>
    // </PrivateRoutes>
export default UsersContainer;



