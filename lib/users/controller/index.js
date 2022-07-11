var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
async function index(req, res) {
  var response = {
    success: false,
    message: [],
    data: {},
  };
  models.User.findAll({})
    .then((users) => {
      if (Array.isArray(users)) {
        response.data = users;
        response.success = true;
      } else {
        response.message.push("hi");
      }
    })
    .finally(() => {
      res.send(response);
    });
}
//////////////////////////////////////////////////////////////////
//************************** Sign up done *************************
//Notes: default value for sign up user is normal user.

async function signUp(req, res, next) {
  let firstName = req?.body?.firstName;
  let lastName = req?.body?.lastName;
  let email = req?.body?.email;
  let password = req?.body?.password;

  if (!firstName || !lastName || !email || !password) {
    return response.failedWithMessage(
      "firstName , lastName, email, and password are required in the req body",
      res
    );
  }

  try {
    const result = await service.signup(firstName, lastName, email, password);
    if (result?.code === 0) {
      return response.successWithMessage(result?.data, res);
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

///////////////////////////////////////////////////////////////////////////////
//******************************Sign in is done********************************

async function signIn(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return response.failedWithMessage(
      "email and password are required in req body",
      res
    );
  }
  try {
    let result = await service.signIn(email, password);
    // console.log(result, "resultlttttt");
    if (result?.code === 0) {
      res.cookie("jwt", result.data.token); // <--- Adds token to response as a cookie
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

///deleteUsere

async function deleteUsere(req, res, next) {
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
  const deleted = await models.User.destroy({
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

///////////////////////////////////////////////////////////////////////////////
//******************************Profile is done********************************
//Notes: token is embeded in cookies.

async function profile(req, res) {
  console.log(req.user.isActive, "requestidddddd");
  const result = await models.User.findOne({
    where: {
      id: req.user.id,
    },
  });

  if (!result.isActive) {
    return response.notAcceptable(res);
  }

  try {
    let userId = req.user.id;
    let result = await service.getProfile(userId);
    if (result?.code === 0) {
      return response.success(result.data, res);
    } else if (result?.code === 1) {
      return response.failedWithMessage(result?.data, res);
    } else {
      return response.notAcceptable(res);
    }
  } catch (e) {
    return response.serverError(res);
  }
}

async function postComment(req, res) {
  let comment = req.body.comment;
  // let picture = req.body.picture;
  let rate = req.body.rate;
  // let type = req.body.type;

  // if (!comment || !rate || ) {
  //   return response.failedWithMessage(
  //     "comment, rate, and service_id are required in req body",
  //     res
  //   );
  // }
  try {
    const user_id = req.user.id;
    let { id } = req.params;

    let result = await service.postComment(comment, rate, id, user_id);
    console.log(result, "rereulslls");
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

async function getCommentsByServiceId(req, res) {
  const { id } = req.params;
  const result = await models.Comment.findAll({
    where: {
      service_id: id,
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("error while getting comments", res);
  }
}

///////////////////////////////////////////////////////////////////////////////
//******************************Logout is done********************************

async function signOut(req, res) {
  res.cookie("jwt", "", { expires: new Date(0) });
  return response.successWithMessage("Signed out", res);
}

module.exports = {
  signUp,
  signIn,
  profile,
  signOut,
  postComment,
  index,
  deleteUsere,
  getCommentsByServiceId,
};
