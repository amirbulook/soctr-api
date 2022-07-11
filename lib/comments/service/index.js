const models = require("../../../models");
const authService = require("../../auth-services");

exports.allComments = async () => {
  try {
    let result = await models.Comment.findAll({});

    if (result) {
      return { code: 0, data: "all comments found" };
    } else {
      return { code: 1, data: "no comments found" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
