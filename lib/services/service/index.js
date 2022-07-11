const models = require("../../../models");
const authService = require("../../auth-services");
const { Op } = require("sequelize");

exports.signup = async (firstName, lastName, email, password) => {
  try {
    let [result, created] = await models.User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        firstName,
        lastName,
        email,
        password: authService.hashPassword(password),
      },
    });
    if (created) {
      return { code: 0, data: "user created" };
    } else {
      return { code: 1, data: "This user already exists" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//////////////////////////////////////////////////////////////////////
exports.signIn = async (email, password) => {
  try {
    let user = await models.User.findOne({
      where: {
        email,
      },
    });
    console.log(user.role_type, "suerssss");
    // let isActive = user.isActive;

    if (!user) {
      return { code: 1, data: "incorrect credentials" };
    } else {
      let passwordMatch = authService.comparePasswords(password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user); // <--- Uses the authService to create jwt token
        let { password, updatedAt, createdAt, ...rest } = user.dataValues;

        return { code: 0, data: { ...rest, token } };
      } else {
        return { code: 1, data: "incorrect credentials" };
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//////////////////////////////////////////////////////////////////////

exports.getProfile = async (userId) => {
  try {
    let query = `SELECT 
    name, username, email, createdAt
FROM
    users
WHERE
    id = :userId;`;
    const data = await models.sequelize.query(query, {
      replacements: {
        userId,
      },
      type: models.sequelize.QueryTypes.SELECT,
    });
    if (data) {
      return { code: 0, data: data[0] };
    } else {
      return { code: 1, data: "failed to fetch user profile" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

exports.getServiceInfo = async (id) => {
  try {
    const hotel = await models.Service.findOne({
      where: {
        id,
        // type: {
        //   [Op.eq]: "hotel",
        // },
      },
    });
    console.log(hotel);
    if (!hotel) return null;
    return hotel;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};
