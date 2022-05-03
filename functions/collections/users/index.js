const { firestore } = require("../../config");
const logger = require("../../utils/logger");
const { snapshotToArray } = require("../../utils");

const fetchUsers = async () => {
  return null;
};

const fetchUser = async (userId) => {
  const userQuerySnapShot = await firestore.doc(`users/${userId}`).get();
  return userQuerySnapShot.exists ? userQuerySnapShot.data() : null;
};

const updateUser = async (userId, user) => {
  const _userBefore = fetchUser(userId);
  logger.log(_userBefore);

  await firestore.doc(`users/${userId}`).set(user, { merge: true });

  const _userAfter = fetchUser(userId);
  logger.log(_userAfter);
};

const fetchUserByEmail = async (userEmail) => {
  const userSnapshot = await firestore.collection("users").where("email", "==", userEmail).get();

  if (userSnapshot.empty) return null;

  return snapshotToArray(userSnapshot)[0];
};

module.exports = { fetchUsers, fetchUser, updateUser, fetchUserByEmail };
