const { config, firestore } = require("../../../config");
const logger = require("../../../utils/logger");
const { updateEmail } = require("../../../collections/emails");

const postEmail = async (req, res, next) => {
  try {
    logger.log("user post emails->", req.body);

    let newEmail = req.body;

    const newId = await firestore.collection("emails").doc().id;

    if (!newEmail.email)
      return res.status(412).send({
        statusText: "invalid-email",
        message: "Email es requerido",
        isValidate: true,
        seen: false,
      });

    await updateEmail(newId, {
      ...newEmail,
      id: newId,
      createAt: new Date(),
      deleted: false,
    });

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = { postEmail };
