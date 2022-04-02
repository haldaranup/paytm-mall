const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.sercet_key, function (err, decoded) {
      console.log(err);
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.send({ message: "bearer token not found" });
    }
    if (!req.headers.authorization.startsWith("Bearer ")) {
      res.send({ message: "bearer token not found" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "token");
    let decoded;
    try {
      decoded = await verifyToken(token);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Authorization token not found or incorrect" });
    }

    console.log(decoded);

    req.user = decoded.user;

    return next();
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = authenticate;
