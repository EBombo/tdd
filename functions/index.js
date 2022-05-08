const functions = require("firebase-functions");
const api = require("./api");

const runtimeOptions = {
  timeoutSeconds: 60,
  memory: "1GB",
};

const apiRegion = "us-central1";

exports.api = functions.runWith(runtimeOptions).region(apiRegion).https.onRequest(api.api);
