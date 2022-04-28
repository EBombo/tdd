const logger = require("../../../utils/logger");
const { fetchUserByToken } = require("../../../collections/users");
const { config } = require("../../../config");

exports.getUserToken = async (req, res, next) => {
  try {
    logger.log("getUserToken", req.params, req.headers["fastly-client-ip"], req.headers["x-forwarded-for"]);

    const { tokenId } = req.params;

    const user = await fetchUserByToken(tokenId);

    if (!user) return res.send({});

    //get token user => si es premium poner en cache por 5 dias
    if (user) res.set("Cache-Control", `public, max-age=${config.maxAgeCacheUserToken}`);

    return res.send({
      user: {
        id: user.id,
        email: user.email,
        memberships: (user.memberships || []).map((membership) => ({
          ...membership,
          endDate: membership.endDate.toDate(),
        })),
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
