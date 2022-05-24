const logger = require("../../../utils/logger");
const { deleteUserAccount } = require("../../../collections/users");

exports.deleteUser = async (req, res, next) => {
  try {
    logger.log("deleteUser", req.params);

    const { userId } = req.params;

    console.log("userId", userId);

    await deleteUserAccount(userId);

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
