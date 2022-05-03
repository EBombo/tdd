const logger = require("../../../utils/logger");
const { updateUser } = require("../../../collections/users");
const Date = require("yup/lib/date");

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

    await updateUser(user.id, user);

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = { postUser };
