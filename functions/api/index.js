const { getUserToken, getVerifyCode, getResendVerifyCode, getSendEmail } = require("./users/get");
const { postError, getError } = require("./errors");
const { postUser } = require("./users/post");
const { postContact } = require("./contact/post");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { getManifest } = require("./manifests/get");

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

//------------------------contact------------------------

router.post("/contact/", postContact);

//------------------------send email------------------------

router.get("/templates/:templateId/emails/:emailId", getSendEmail);

//------------------------manifest------------------------

router.get("/manifest", getManifest);

//------------------------error------------------------

router.get("/error-vanilla", getError);

router.post("/error-boundary", postError);

api.use("/api", router);

module.exports = { api };
