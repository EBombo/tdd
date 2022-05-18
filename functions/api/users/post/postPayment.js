const logger = require("../../../utils/logger");
const { config, firestore, adminFirestore } = require("../../../config");
const fetch = require("node-fetch");
const { defaultCost } = require("../../../business");
const { updateUser } = require("../../../collections/users");
const { updateCoupon } = require("../../../collections/coupons");
const { fetchTemplate, fetchSettingsLanding } = require("../../../collections/settings");
const { sendEmail } = require("../../../email/sendEmail");
const moment = require("moment");

exports.postPayment = async (req, res, next) => {
  try {
    logger.log("postPayment", req.query, req.body, req.params);

    const { userId } = req.params;
    const { user, email, source_id, currency_code, amount, coupon } = req.body;

    if (!user) throw Error("User is required");

    if (!email) throw Error("Email is required");

    if (userId !== user.id) throw Error("User is corrupt.");

    if (!amount) throw Error("amount is required");

    if (amount < 0) throw Error("Amount is invalid");

    if (!source_id) throw "token is invalid";

    if (currency_code !== "PEN") throw Error("Currency is corrupt");

    /**
     * Calcular el monto a pagar, este debe coincidir con el monto recibido,
     * de lo contrario puede hacer algun tipo de corrupcion con el proceso.
     **/
    const discount = +(coupon ? coupon.discountFactor : 0);
    const discountAmount = defaultCost * discount;
    const totalAmount = defaultCost - discountAmount;

    if (+totalAmount !== +amount) throw Error("El monto de pago no es valido");

    const response = await culqiCharges(email, source_id, currency_code, amount);

    /** This logger is necessary. **/
    logger.log("response", response);

    const promisePayment = createPayment({ user, email, source_id, currency_code, amount, coupon, response });
    const promiseUser = updateUser(userId, { hasPayment: true });
    const promiseCoupon = updateCoupon(coupon ? coupon.id : null, {
      totalUsed: adminFirestore.FieldValue.increment(1),
    });

    await Promise.all([promisePayment, promiseUser, promiseCoupon]);

    await sendEmailToUser(user.email ?? email);

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const sendEmailToUser = async (email) => {
  const template = await fetchTemplate("ticket");
  const settings = await fetchSettingsLanding();

  const date = moment(settings.countdown.toDate()).locale("es").format("MMMM Do YYYY, h:mm a");

  await sendEmail(email.trim(), "Tu pago fue aceptado ¡Ya tienes tu entrada!", template, {
    eventDate: date,
  });
};

const culqiCharges = async (email, source_id, currency_code, amount) => {
  const formattedAmount = +amount * 100;

  const response = await fetch("https://api.culqi.com/v2/charges", {
    method: "POST",
    body: JSON.stringify({
      source_id: source_id,
      amount: formattedAmount,
      currency_code: currency_code,
      email: email,
    }),
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${config.culqi}`,
    },
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
};

const createPayment = async (paymentProps) => {
  const paymentRef = await firestore.collection("payments");

  const paymentId = paymentRef.doc().id;

  await paymentRef
    .doc(paymentId)
    .set(
      { ...paymentProps, createAt: new Date(), updateAt: new Date(), deleted: false, id: paymentId },
      { merge: true }
    );
};
