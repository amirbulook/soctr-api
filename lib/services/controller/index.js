var models = require("../../../models");
let service = require("../service");
let response = require("../../responses");

async function getHotels(req, res, next) {
  const result = await models.Service.findAll({
    where: {
      type: "hotel",
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("couldnt get the hotels", res);
  }
}

////getServiceById

const getService = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return response.failedWithMessage("ID undifine", res);
    const hotelInfo = await service.getServiceInfo(id);
    if (!hotelInfo)
      return response.failedWithMessage("faied to get info of hotel", res);
    return response.success(hotelInfo, res);
  } catch (err) {
    console.log("ERROR-->", err);
    return response.failedWithMessage("serrver error", res);
  }
};

async function getResturants(req, res, next) {
  const result = await models.Service.findAll({
    where: {
      type: "resturant",
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("couldnt get the hotels", res);
  }
}

async function getAgencies(req, res, next) {
  const result = await models.Service.findAll({
    where: {
      type: "agnecy",
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("couldnt get the hotels", res);
  }
}

async function getTourismPlaces(req, res, next) {
  const result = await models.Service.findAll({
    where: {
      type: "tourismPlace",
    },
  });
  if (result) {
    return response.success(result, res);
  } else {
    return response.failedWithMessage("couldnt get the hotels", res);
  }
}

async function deleteServices(req, res, next) {
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
  const deleted = await models.Service.destroy({
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
  getHotels,
  getResturants,
  getAgencies,
  getTourismPlaces,
  deleteServices,
  // EditHotel,
  // getServicesId,
  getService,
  // getHotelsById,
};
