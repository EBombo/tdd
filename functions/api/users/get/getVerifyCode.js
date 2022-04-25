const {sendEmail} = require("../../../email/sendEmail");
const {get} = require("lodash");
const logger = require("../../../utils/logger");
const {config} = require("../../../config");
const {updateUser, fetchUser} = require("../../../collections/users");
const {fetchTemplate} = require("../../../collections/templates");

const getVerifyCode = async (req, res, next) => {
    try {
        logger.log("getVerifyCode", req.params);

        const {userId, verificationCode} = req.params;

        const user = await fetchUser(userId);
        const origin = get(user, "origin", config.serverUrl);

        if (String(get(user, "verificationCode")) !== String(verificationCode))
            return res.redirect(`${origin}/500`);

        const template = await fetchTemplate("newAccount");

        const promiseUpdate = updateUser(userId, {isVerified: true});
        const promiseSendEmail = sendEmail(user.email, get(template, "subject", "Bienvenido"), template.content, {
            userName: get(user, "name", "").toUpperCase(),
            userEmail: user.email,
            link: origin,
        });

        await Promise.all([promiseUpdate, promiseSendEmail]);

        return res.redirect(origin);
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

module.exports = {getVerifyCode};
