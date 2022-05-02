const logger = require("../../../utils/logger");
const { config } = require("../../../config");
const fetch = require("node-fetch");

exports.postPayment = async (req, res, next) => {
  try {
    logger.log("postPayment", req.query, req.body, req.params);

    const { userId } = req.params;
    const { user, email, source_id, currency_code, amount } = req.body;

    if (!user) throw Error("User is required");

    if (!email) throw Error("Email is required");

    if (userId !== user.id) throw Error("User corrupt.");

    if (!amount) throw Error("amount is required");

    if (amount < 0) throw Error("invalid amount");

    if (!source_id) throw "token invalid";

    if (currency_code !== "PEN") throw Error("current is corrupt");

    const resp = await culqiCharges(email, source_id, currency_code, amount);

    logger.log("resp", resp);
    // Crear el pin de acceso a la cuenta.

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
