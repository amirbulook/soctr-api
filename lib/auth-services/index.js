const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const response = require("../responses");
const models = require("../../models");

const signUser = (user) => {
  const token = jwt.sign(
    {
      // this object will be saved in the token payload
      id: user.id,
      email: user.email,
      role_type: user.role_type,
    },
    process.env.JWT_SECRET, // will read from the .env file JWT_SECRET and will take the value
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const verifyUser = (req, res, next) => {
  try {
    // take out the jwt set in the cookie set or from auth headers coming from client
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    // return error if token is undefined
    if (!token) return response.unauthenticated(res);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // return an error if there was an issue verifying the token
      if (err) {
        return response.unauthorized(res);
      } else {
        // set the user data to the req obj using the decoded token payload
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role_type: decoded.role_type,
          token: token,
        };
        if (req.user.isActive === 0) {
          return response.unauthorized(res);
        }
        // call the next middleware
        return next();
      }
    });
  } catch (err) {
    console.error(err);
    return response.serverError(res);
  }
};

const isAdmin = (req, res, next) => {
  const role = req.user.role_type;
  if (role === 1) {
    return next();
  } else {
    return response.unauthorized(res);
  }
};

const isDriver = (req, res, next) => {
  const role = req.user.role_type;
  if (role === "driver") {
    return next();
  } else {
    return response.unauthorized(res);
  }
};

const isManeger = (req, res, next) => {
  const role = req.user.role_type;
  if (role === "maneger") {
    return next();
  } else {
    return response.unauthorized(res);
  }
};

const isTeacher = (req, res, next) => {
  const role = req.user.role_type;
  if (role === "teacher") {
    return next();
  } else {
    return response.unauthorized(res);
  }
};

const hashPassword = (plainTextPassword) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

const comparePasswords = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

module.exports = {
  signUser,
  verifyUser,
  hashPassword,
  isAdmin,
  isDriver,
  isManeger,
  isTeacher,
  comparePasswords,
};
