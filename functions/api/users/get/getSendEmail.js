const { fetchTemplate } = require("../../../collections/settings");
const { sendEmail } = require("../../../email/sendEmail");
const logger = require("../../../utils/logger");
const { firestore } = require("../../../config");
const get = require("lodash/get");

exports.getSendEmail = async (req, res, next) => {
  try {
    logger.log("getSendEmail", req.params);

    const { templateId, emailId } = req.params;

    const template = await fetchTemplate(templateId);

    const promiseSendEmail = sendEmail(emailId, get(template, "subject", "Hello"), template.content, {});

    const promiseRegEmailSend = createRegEmailSend(emailId, template);

    await Promise.all([promiseSendEmail, promiseRegEmailSend]);

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const createRegEmailSend = async (email, template) => {
  try {
    const emailsSentRef = firestore.collection("emailsSent");
    const emailsSentId = emailsSentRef.doc().id;

    await emailsSentRef.doc(emailsSentId).set(
      {
        id: emailsSentId,
        email,
        templateId: template.id,
        template: { id: template.id },
        deleted: false,
        createAt: new Date(),
        updateAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    logger.error(error, email, template.id);
  }
};
