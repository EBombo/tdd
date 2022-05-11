const { firestore } = require("../../config");

const fetchEmail = async (emailId) => {
  const emailQuerySnapShot = await firestore.doc(`emails/${emailId}`).get();
  return emailQuerySnapShot.exists ? emailQuerySnapShot.data() : null;
};

const updateEmail = async (emailId, email) =>
  await firestore.doc(`emails/${emailId}`).set({ ...email, updateAt: new Date() }, { merge: true });

module.exports = { fetchEmail, updateEmail };
