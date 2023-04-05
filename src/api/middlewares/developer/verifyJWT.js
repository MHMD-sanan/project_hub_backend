/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const DeveloperSchema = require("../../models/developer/developerSchema");

module.exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401); //
  const token = authHeader.split(" ")[1]; // to get only token from header
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token
    req.developer = await DeveloperSchema.findOne({
      email: decoded.email,
    });
    if (!req.developer) return res.sendStatus(403); // Forbidden
    if (req.developer.status===false) return res.sendStatus(403); // Forbidden
    next();
  });
};
