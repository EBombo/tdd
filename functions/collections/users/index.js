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
  let user_ = await fetchUser(userId);
  logger.log("before change ", userId, user_.money);

  await firestore.doc(`users/${userId}`).update(user);

  user_ = await fetchUser(userId);
  logger.log("after change ", userId, user_.money);
};

const fetchUserByEmail = async (userEmail) => {
  const userSnapshot = await firestore
    .collection("users")
    .where("email", "==", userEmail)
    .get();

  if (userSnapshot.empty) return null;

  return snapshotToArray(userSnapshot)[0];
};

module.exports = { fetchUsers, fetchUser, updateUser, fetchUserByEmail };
