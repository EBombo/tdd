import { createContact } from "../../../src/api/contact/createContact";
import Cors from "cors";
import initMiddleware from "../../../lib";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  })
);

const apiContact = async (req, res) => {
  // Run cors
  await cors(req, res);

  switch (req.method) {
    case "POST":
      return await createContact(req, res);
    default:
      return res.status(500).send({ error: "Method is not defined" });
  }
};

export default apiContact;
