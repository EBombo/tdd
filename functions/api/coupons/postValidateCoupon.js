const logger = require("../../utils/logger");
const { firestore } = require("../../config");
const { snapshotToArray } = require("../../utils");
const moment = require("moment");

const defaultCost = 200;

exports.postValidateCoupon = async (req, res, next) => {
  try {
    logger.log("postValidateCoupon", req.body, req.params);

    const { couponCode, userDate } = req.body;
    const currentUserDate = new Date(userDate);

    if (couponCode !== req.params.couponCode) throw Error("Cupón invalido");

    const coupon = await fetchCoupon(couponCode);

    if (!coupon) throw Error("El cupón no existe");

    const paymentsLength = await fetchPayments(coupon.id);

    const isAvailable = moment(coupon.activeSince.toDate()).isBefore(currentUserDate);
    if (!isAvailable) throw Error("Cupón no esta disponible");

    const isExpired = moment(coupon.expireAt.toDate()).isBefore(currentUserDate);
    if (isExpired) throw Error("Cupón ha expirado");

    if (!coupon.enabled) throw Error("Cupón no esta disponible");

    if (coupon.maxUsage >= paymentsLength) throw Error("Cupón ha superado su limite de uso");

    const totalDiscount = defaultCost * +scoupon.discountFactor;

    return res.send({ success: true, discount: totalDiscount, coupon });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ message: error.message, success: false });
  }
};

const fetchCoupon = async (couponCode) => {
  const couponQuery = await firestore
    .collection("coupons")
    .where("code", "==", couponCode)
    .where("deleted", "==", false)
    .orderBy("createAt", "desc")
    .limit(1)
    .get();

  return snapshotToArray(couponQuery)[0];
};

const fetchPayments = async (couponId) => {
  const paymentsQuery = await firestore.collection("payments").where("coupon.id", "==", couponId).get();
  return paymentsQuery.size;
};
