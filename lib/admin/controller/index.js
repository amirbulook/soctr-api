var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");
const { uplaod } = require("../../firebase/controller");

async function admninSignIn(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return response.failedWithMessage(
      "email and password are required in req body",
      res
    );
  }
  try {
    let result = await service.admninSignIn(email, password);
    console.log(result, "rereulslls");
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
//  createHotel
async function createHotel(req, res) {
  let title = req.body.title;
  let detail = req.body.detail;
  let type = "hotel";
  let picture = req?.file;

  if (!title || !detail) {
    return response.failedWithMessage(
      "title, picture and detail are required in req body",
      res
    );
  }
  try {
    const PicDownloadURL = await uplaod(picture);
    console.log("PicDownloadURL", PicDownloadURL);
    if (!PicDownloadURL)
      return response.failedWithMessage("image dose not upload", res);
    let result = await service.createHotel(title, detail, PicDownloadURL, type);
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

async function editHotel(req, res) {
  var response = {
    success: false,
    data: {},
    messages: [],
  };
  const id = req.params.id;
  if (isNaN(id)) {
    response.messages.push("Please provide a valid ID");
    res.send(response);
    return;
  }
  const service = await models.Service.findByPk(id);
  if (service) {
    const title = req.body.title;
    const detail = req.body.detail;
    if (title || detail) {
      service.title = title;
      service.detail = detail;
    }
    // if (req.file) {
    //     fs.unlink('uploads/' + service.picture, () => { })
    //     service.picture = req.file.filename
    // }

    service.save().then(function (service) {
      console.log(service);
      // response.data = serviceTransformer(service);
      response.success = true;
      response.messages.push("Service has been updated");
      res.send(response);
    });
  } else {
    response.messages.push("Service not found");
    res.send(response);
  }
}

// createTourismPlace

async function createTourismPlace(req, res) {
  let title = req.body.title;
  let detail = req.body.detail;
  let type = "tourismPlace";
  let picture = req?.file;

  if (!title || !detail) {
    return response.failedWithMessage(
      "title, picture and detail are required in req body",
      res
    );
  }
  try {
    const PicDownloadURL = await uplaod(picture);
    console.log("PicDownloadURL", PicDownloadURL);
    if (!PicDownloadURL)
      return response.failedWithMessage("image dose not upload", res);
    let result = await service.createTourismPlace(
      title,
      detail,
      PicDownloadURL,
      type
    );
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
//  createAgencie
async function createAgencie(req, res) {
  let title = req.body.title;
  let detail = req.body.detail;
  let type = "agnecy";
  let picture = req?.file;

  if (!title || !detail) {
    return response.failedWithMessage(
      "title, picture and detail are required in req body",
      res
    );
  }
  try {
    const PicDownloadURL = await uplaod(picture);
    console.log("PicDownloadURL", PicDownloadURL);
    if (!PicDownloadURL)
      return response.failedWithMessage("image dose not upload", res);
    let result = await service.createAgencie(
      title,
      detail,
      PicDownloadURL,
      type
    );
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
// createResturant
async function createResturant(req, res) {
  let title = req.body.title;
  let detail = req.body.detail;
  let type = "resturant";
  let picture = req?.file;

  if (!title || !detail) {
    return response.failedWithMessage(
      "title, picture and detail are required in req body",
      res
    );
  }
  try {
    const PicDownloadURL = await uplaod(picture);
    console.log("PicDownloadURL", PicDownloadURL);
    if (!PicDownloadURL)
      return response.failedWithMessage("image dose not upload", res);
    let result = await service.createResturant(
      title,
      detail,
      PicDownloadURL,
      type
    );
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
///////////////////////////////////////////////////////////////////////////////

// async function allusers(req, res, next) {
//     let user = await models.User;
//     if (user) {
//       models.User.findAll({}).then(users =>{
//         res.send(users)
//       })
//     } else {
//       res.send("unauthorized");
//     }
//   };

// async function getActiveUsers(req, res) {
//   models.User.findAll({
//     where: {
//       isActive: 1,
//     },
//   })
//     .then((users) => {
//       if (users.length) {
//         let newUsers = users.map((user) => {
//           let { password, updatedAt, ...rest } = user.dataValues;
//           return rest;
//         });
//         return response.success(newUsers, res);
//       } else {
//         return response.successWithMessage("No Users Found!", res);
//       }
//     })
//     .catch((e) => {
//       console.error(e);
//       return response.serverError(res);
//     });
// }

// async function getUsers(req, res) {
//   models.User.findAll({})
//     .then((users) => {
//       if (users.length) {
//         let newUsers = users.map((user) => {
//           let { password, updatedAt, ...rest } = user.dataValues;
//           return rest;
//         });
//         return response.success(newUsers, res);
//       } else {
//         return response.successWithMessage("No Users Found!", res);
//       }
//     })
//     .catch((e) => {
//       console.error(e);
//       return response.serverError(res);
//     });
// }
///////////////////////////////////////////////////////////////////////////////

// async function getAllUsers(req, res) {
//   try {
//     const userId = req.user.id;
//     const result = await service.getAllUsers(userId);
//     if (result?.code === 0) {
//       return response.success(result?.data[0], res);
//     } else if (result?.code === 1) {
//       return response.failedWithMessage(result?.data, res);
//     } else {
//       return response.notAcceptable(res);
//     }
//   } catch (e) {
//     console.error(e);
//     return response.serverError(res);
//   }
// };

// async function deactivate(req, res, next) {
//   try {
//     const userID = req.params.id;
//     const result = await service.deactivate(userID);
//     if (result) {
//       return response.successWithMessage("User is now ", res);
//     }
//     return response.failedWithMessage("Could not deactivate/activate", res);
//   } catch (e) {
//     return response.serverError(res);
//   }
// }

// async function changeRoel(req, res, next) {
//   try {
//     const userID = req.params.id;
//     const role = req.body.role_type;
//     const result = await service.changeRoel(userID, role);
//     if (result) {
//       return response.successWithMessage("User is now ", res);
//     }
//     return response.failedWithMessage("Could not deactivate/activate", res);
//   } catch (e) {
//     return response.serverError(res);
//   }
// }

////////////////////////////

/////////////////////////////////////////////////////////////////////////

async function signOut(req, res) {
  res.cookie("jwt", "", { expires: new Date(0) });
  return response.successWithMessage("Signed out", res);
}

/////////////////////////////////////////////////////////////////////////

module.exports = {
  admninSignIn,
  signOut,
  createHotel,
  createAgencie,
  createResturant,
  createTourismPlace,
  editHotel,
  // deactivate,
  // getUsers,
  // changeRoel,
  // getActiveUsers,
};
