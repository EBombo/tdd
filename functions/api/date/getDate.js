const logger = require("../../utils/logger");
const moment = require("moment-timezone");

exports.getDate = async (req, res, next) => {
  try {
    logger.log("getDate", req.query, req.body, req.params);

    const serverDate = moment().tz("America/Los_Angeles").format();

    return res.send({ success: true, date: serverDate });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
