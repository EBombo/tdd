const { config } = require("../../../config");
const { sendEmail } = require("../../../email/sendEmail");
const { get } = require("lodash");
const logger = require("../../../utils/logger");
const { fetchUser } = require("../../../collections/users");
const { fetchTemplate } = require("../../../collections/settings");

const getResendVerifyCode = async (req, res, next) => {
  try {
    logger.log("resendVerifyCode", req.params);

    const { userId } = req.params;

    const user = await fetchUser(userId);

    const origin = get(user, "origin", config.serverUrl);

    const template = await fetchTemplate("verifyCode");

    await sendEmail(
      user.email,
      get(template, "subject", "Bienvenido, confirma tu correo electrónico"),
      template.content,
      {
        userName: get(user, "name", "").toUpperCase(),
        userEmail: user.email,
        verifyAccountLink: `${origin}/api/verify/${user.id}/verification-code/${user.verificationCode}`,
        code: user.verificationCode,
      }
    );

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = { getResendVerifyCode };
