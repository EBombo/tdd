const cors = require("cors");
const express = require("express");
const { getDate } = require("./date");
const bodyParser = require("body-parser");
const { postContact } = require("./contact/post");
const { getManifest } = require("./manifests/get");
const { postValidateCoupon } = require("./coupons");
const { postError, getError } = require("./errors");
const { postUser, postPayment } = require("./users/post");
const { getUserToken, getVerifyCode, getResendVerifyCode, getSendEmail } = require("./users/get");

const api = express();
const router = express.Router();

router.use(cors({ origin: "*" }));

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => res.send("Hello!"));

//------------------------user------------------------

router.post("/users/:userId", postUser);

router.get("/users/tokens/:tokenId", getUserToken);

router.get("/verify/:userId/resend-code", getResendVerifyCode);

router.get("/verify/:userId/verification-code/:verificationCode", getVerifyCode);

router.post("/users/:userId/payment", postPayment);

//------------------------contact------------------------

router.post("/contact", postContact);

//------------------------send email------------------------

router.get("/templates/:templateId/emails/:emailId", getSendEmail);

//------------------------manifest------------------------

router.get("/manifest", getManifest);

router.get("/error-vanilla", getError);

router.post("/error-boundary", postError);

//------------------------error------------------------

router.post("/coupons/:couponCode/validate", postValidateCoupon);

//------------------------coupons------------------------

router.get("/get-server-date", getDate);

//------------------------coupons------------------------

api.use("/", router);

module.exports = { api };
