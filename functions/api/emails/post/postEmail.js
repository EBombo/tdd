const { firestore, config } = require("../../../config");
const logger = require("../../../utils/logger");
const { updateEmail } = require("../../../collections/emails");
const { fetchTemplate } = require("../../../collections/settings");
const { sendEmail } = require("../../../email/sendEmail");

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

    await sendEmailToAdmin(newEmail);

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const sendEmailToAdmin = async (email) => {
  const contactTemplate = await fetchTemplate("contact");

  await sendEmail(config.mails, "Consulta TDD", contactTemplate, {
    email: email.email.trim(),
    message: email.message,
    name: email.name,
    lastName: email.lastName
  });
};

module.exports = { postEmail };
