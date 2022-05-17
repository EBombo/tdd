const { firestore } = require("../../config");
const logger = require("../../utils/logger");
const { snapshotToArray } = require("../../utils");

const fetchCoupon = async (couponId) => {
  const couponQuerySnapShot = await firestore.doc(`coupons/${couponId}`).get();
  return couponQuerySnapShot.exists ? couponQuerySnapShot.data() : null;
};

const updateCoupon = async (couponId, coupon) => {
  if (!couponId) return;
  await firestore.doc(`coupons/${couponId}`).set(coupon, { merge: true });
  logger.log(coupon);
};

module.exports = { fetchCoupon, updateCoupon };
