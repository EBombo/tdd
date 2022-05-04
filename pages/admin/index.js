import { AdminPrivateRoute } from "../../src/routes/AdminPrivateRoute";
import { AdminIndex } from "../../src/pages/admin";
import Navbar from "../../src/components/Navbar";

const AdminIndexContainer = (props) => {
  return (
    <AdminPrivateRoute>
      <Navbar>
        <AdminIndex />
      </Navbar>
    </AdminPrivateRoute>
  );
};

export default AdminIndexContainer;

