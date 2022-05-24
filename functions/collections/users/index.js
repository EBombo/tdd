const { firestore, auth } = require("../../config");
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
  const _userBefore = await fetchUser(userId);
  logger.log(_userBefore);

  await firestore.doc(`users/${userId}`).set(user, { merge: true });

  const _userAfter = await fetchUser(userId);
  logger.log(_userAfter);
};

const fetchUserByEmail = async (userEmail) => {
  const userSnapshot = await firestore.collection("users").where("email", "==", userEmail).get();

  if (userSnapshot.empty) return null;

  return snapshotToArray(userSnapshot)[0];
};

const deleteUserAccount = async (userId) => {
  /** Delete user on firebase.**/
  const promiseFirebase = firestore.collection("users").doc(userId).delete();
  /** Delete user on authentication.**/
  const promiseAuthentication = auth.deleteUser(userId);

  await Promise.all([promiseFirebase, promiseAuthentication]);
};

module.exports = { fetchUsers, fetchUser, updateUser, fetchUserByEmail, deleteUserAccount };
