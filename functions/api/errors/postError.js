const {firestore} = require("../../config");
const logger = require("../../utils/logger");
const defaultTo = require("lodash/defaultTo");

const postError = async (req, res, next) => {
    try {
        logger.log("error from boundary", req.body);

        const errors = req.body;

        await saveError(defaultTo(errors, {}));

        return res.send({success: true});
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

const saveError = async errors => {
    const errorId = firestore.collection("errors").doc().id;

    await firestore
        .collection("errors")
        .doc(errorId)
        .set({
            id: errorId,
            ...errors,
            vanilla: false,
            createAt: new Date(),
            updateAt: new Date(),
            delete: false,
        });
};

module.exports = {postError};
