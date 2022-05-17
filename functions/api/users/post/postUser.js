const logger = require("../../../utils/logger");
const { updateUser } = require("../../../collections/users");
const { searchName } = require("../../../utils");
const { fetchTemplate, fetchSettingsLanding } = require("../../../collections/settings");
const { sendEmail } = require("../../../email/sendEmail");
const moment = require("moment");

const postUser = async (req, res, next) => {
  try {
    logger.log("user register->", req.body);

    let user = req.body;

    user.id = req.params.userId;

    if (!user.email)
      return res.status(412).send({
        statusText: "invalid-email",
        message: "Email es requerido",
        isValidate: true,
      });

    const _searchName = searchName(user);

    await updateUser(user.id, { ...user, searchName: _searchName, createAt: new Date(), updateAt: new Date() });

    await sendEmailToUser({ ...user, searchName: _searchName, createAt: new Date(), updateAt: new Date() });

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const sendEmailToUser = async (user) => {
  const welcomeTemplate = await fetchTemplate("welcome");
  const settings = await fetchSettingsLanding();

  const date = moment(settings.countdown.toDate()).locale("es").format("MMMM Do YYYY, h:mm a");

  await sendEmail(user.email.trim(), "Bienvenido al TDD", welcomeTemplate, {
    eventDate: date,
  });
};

module.exports = { postUser };