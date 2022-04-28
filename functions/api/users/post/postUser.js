const { config, adminFirestore, firestore } = require("../../../config");
const logger = require("../../../utils/logger");
const { searchName } = require("../../../utils");
const defaultTo = require("lodash/defaultTo");
const fetch = require("node-fetch");
const get = require("lodash/get");
const moment = require("moment");

const postUser = async (req, res, next) => {
  try {
    logger.log("user register->", req.body);

    let user = req.body;
    const origin = get(req, "headers.origin", config.serverUrl);

    user.id = req.params.userId;

    if (!user.email)
      return res.status(412).send({
        statusText: "invalid-email",
        message: "Email es requerido",
        isValidate: true,
      });

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = { postUser };
