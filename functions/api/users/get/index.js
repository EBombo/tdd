const { getVerifyCode } = require("./getVerifyCode");
const { getResendVerifyCode } = require("./getResendVerifyCode");
const { getUserToken } = require("./getUserToken");
const { getSendEmail } = require("./getSendEmail");

exports.getSendEmail = getSendEmail;
exports.getUserToken = getUserToken;
exports.getVerifyCode = getVerifyCode;
exports.getResendVerifyCode = getResendVerifyCode;
