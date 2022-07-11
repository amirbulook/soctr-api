const models = require("../../../models");
const authService = require("../../auth-services");
const { getHotels } = require("../../services/controller");

exports.signup = async (name, username, email, password) => {
  try {
    let [result, created] = await models.User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        username,
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

////////////////////////////////admninSignIn/////////////////////////////////////////////////

exports.admninSignIn = async (email, password) => {
  try {
    let user = await models.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return { code: 1, data: "incorrect credentials" };
    } else {
      let passwordMatch = authService.comparePasswords(password, user.password);
      if (passwordMatch && user.role_type == 1) {
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

//////////////////////////////////////createService///////////////////////////////////////////

exports.createHotel = async (title, detail, picture, type) => {
  try {
    let query = `INSERT INTO services (title, detail, type, picture ) VALUES (:title, :detail, :type , :picture)  
 `;
    console.log(query, "queryrryryry");
    const data = await models.sequelize.query(query, {
      replacements: {
        title,
        detail,
        type,
        picture,
      },
      type: models.sequelize.QueryTypes.INSERT,
    });
    console.log(data, "dataaaaa");
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

/// createAgencie

exports.createAgencie = async (title, detail, picture, type) => {
  try {
    let query = `INSERT INTO services (title, detail, type, picture ) VALUES (:title, :detail, :type , :picture)  
 `;
    console.log(query, "queryrryryry");
    const data = await models.sequelize.query(query, {
      replacements: {
        title,
        detail,
        type,
        picture,
      },
      type: models.sequelize.QueryTypes.INSERT,
    });
    console.log(data, "dataaaaa");
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

// createResturant
exports.createResturant = async (title, detail, picture, type) => {
  try {
    let query = `INSERT INTO services (title, detail, type, picture ) VALUES (:title, :detail, :type , :picture)  
 `;
    console.log(query, "queryrryryry");
    const data = await models.sequelize.query(query, {
      replacements: {
        title,
        detail,
        type,
        picture,
      },
      type: models.sequelize.QueryTypes.INSERT,
    });
    console.log(data, "dataaaaa");
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
//
exports.createTourismPlace = async (title, detail, picture, type) => {
  try {
    let query = `INSERT INTO services (title, detail, type, picture ) VALUES (:title, :detail, :type , :picture)  
 `;
    console.log(query, "queryrryryry");
    const data = await models.sequelize.query(query, {
      replacements: {
        title,
        detail,
        type,
        picture,
      },
      type: models.sequelize.QueryTypes.INSERT,
    });
    console.log(data, "dataaaaa");
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

/////////////////////////////////////////////////////////////////////////////////

// exports.getAllUsers = async (users) => {
//   try {
//     const data = await models.User.findAll({
//       attributes: { exclude: ["password", "createdAt", "updatedAt"] },
//       include: [
//         {
//           model: models.User,
//           where: { deletedAt: null },
//         },
//       ],
//     });
//     if (data.length > 0) {
//       return { code: 0, data };
//     } else if (data.length === 0) {
//       return { code: 0, data: "users not found" };
//     }
//   } catch (e) {
//     console.error(e);
//     throw new Error(e);
//   }
// };
/////////////////////////////////////deactivate////////////////////////////////////////////

exports.deactivate = async (userID) => {
  try {
    let user = await models.User.findByPk(userID);
    if (!user) return null;
    let result = models.User.update(
      {
        isActive: !user["dataValues"].isActive,
      },
      {
        where: {
          id: userID,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

exports.changeRoel = async (userID, role) => {
  try {
    let user = await models.User.findByPk(userID);
    if (!user) return null;
    let result = models.User.update(
      {
        role_type: role,
      },
      {
        where: {
          id: userID,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

exports.updateTodo = async (title, detail, PicDownloadURL, type) => {
  try {
    let query = `UPDATE todos 
    SET 
        title = :title,
        detail = :detail,
        PicDownloadURL = :PicDownloadURL
    WHERE
        id = :id `;
    const data = await sequelize.query(query, {
      replacements: {
        id,
        type,
        title,
        PicDownloadURL,
        detail,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (data[1] === 1) {
      return { code: 0, data: "todo updated" };
    } else {
      return { code: 1, data: "failed to update todo" };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
