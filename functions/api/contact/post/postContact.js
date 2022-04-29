const { config, firestore } = require("../../../config");
const logger = require("../../../utils/logger");

const postContact = async (req, res, next) => {
  try {
    logger.log("user post contact->", req.body);

    let newContact = req.body;

    const origin = get(req, "headers.origin", config.serverUrl);

    if (!newContact.email)
      return res.status(412).send({
        statusText: "invalid-email",
        message: "Email es requerido",
        isValidate: true,
      });

    const contactCollection = firestore.collection("contact");

    await contactCollection.add({
      ...data,
    });

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = { postContact };

