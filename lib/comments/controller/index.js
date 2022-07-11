var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");

async function allComments(req, res) {
  try {
    let result = await service.allComments();
    console.log(result, "resulttttttt");
    if (result?.code === 0) {
      return response.success(result.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
}

async function deleteComments(req, res, next) {
  var response = {
    success: false,
    message: [],
    data: {},
  };
  const id = req.params.id;
  if (isNaN(id)) {
    response.message.push("Please provide a valid ID");
    response.success = false;
    res.send(response);
    return;
  }
  const deleted = await models.Comment.destroy({
    where: {
      id: id,
    },
  });
  if (deleted == 1) {
    response.message.push("Place has been deleted");
    response.success = true;
  } else {
    response.message.push("Place has not been deleted");
  }
  res.send(response);
}

module.exports = {
  allComments,
  deleteComments,
};
