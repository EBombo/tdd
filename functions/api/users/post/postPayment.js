const logger = require("../../../utils/logger");
const { config, firestore } = require("../../../config");
const fetch = require("node-fetch");
const { defaultCost } = require("../../../business");

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
    const discount = +(coupon?.discountFactor ?? 0);
    const discountAmount = defaultCost * discount;
    const totalAmount = defaultCost - discountAmount;

    if (+totalAmount !== +amount) throw Error("El monto de pago no es valido");

    const response = await culqiCharges(email, source_id, currency_code, amount);

    /** This logger is necessary. **/
    logger.log("response", response);

    await createPayment({ user, email, source_id, currency_code, amount, coupon, response });

    return res.send({ success: true });
  } catch (error) {
    logger.error(error);
    next(error);
  }
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
