import { firestore } from "../../firebase";

export const createContact = async (req, res) => {
  try {
    const { data } = req.body;
    const contactCollection = firestore.collection("contact");

    await contactCollection.add({
      ...data
    });

    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
};

