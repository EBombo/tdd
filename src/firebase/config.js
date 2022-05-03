import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import isEmpty from "lodash/isEmpty";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const PORT = process.env.NEXT_PUBLIC_PORT ?? 5000;
console.log("process.env.NEXT_PUBLIC_PORT", PORT);

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "localhost:3001";
console.log("process.env.NEXT_PUBLIC_DOMAIN", DOMAIN);

const CONFIG = process.env.NEXT_PUBLIC_CONFIG ?? "";
//console.log("process.env.NEXT_PUBLIC_CONFIG", CONFIG);

const version = "0.0.1";

const config = JSON.parse(CONFIG);

const hostName = typeof window === "undefined" ? DOMAIN : window.location.host;

if (DOMAIN?.includes("local") || DOMAIN?.includes("red") || DOMAIN?.includes("dev")) {
  console.log("dev", version);
} else {
  console.log("prod", version);
}

let firestore;
let storage;
let auth;
let analytics;
let database;

if (isEmpty(firebase.apps)) {
  try {
    console.log("initializeApp", isEmpty(firebase.apps));
    firebase.initializeApp(config.firebase);

    firestore = firebase.firestore();
    database = firebase.database();
    storage = firebase.storage();
    auth = firebase.auth();

    if (typeof window !== "undefined") analytics = firebase.analytics();

    firestore.settings({ ignoreUndefinedProperties: true });
  } catch (error) {
    console.error("error initializeApp", error);
  }
}

if (DOMAIN?.includes("localhost")) {
  // config.serverUrl = "http://localhost:5001/tdd-dev-348022/us-central1/api";
  //firestore.useEmulator("localhost", 8080);
  //auth.useEmulator("http://localhost:9099/");
}

export { firestore, analytics, database, firebase, hostName, version, storage, config, auth };
