const admin = require("firebase-admin");
const url = require("url");
const configJson = require("./config");
const logger = require("../utils/logger");

const projectId = process.env.GCLOUD_PROJECT;
const currentEnvironment = projectId.includes("-dev") ? "dev" : "production";

const config = projectId.includes("-dev") ? configJson.devConfig : configJson.productionConfig;

admin.initializeApp();
const adminFirestore = admin.firestore;
const firestore = admin.firestore();
const auth = admin.auth();
const storageAdmin = admin.storage();

try {
  firestore.settings({ ignoreUndefinedProperties: true });
} catch (error) {
  logger.error("ignoreUndefinedProperties", error);
}

const hostname = (req) => url.parse(req.headers.origin).hostname;

module.exports = {
  currentEnvironment,
  adminFirestore,
  storageAdmin,
  firestore,
  hostname,
  config,
  auth,
};
