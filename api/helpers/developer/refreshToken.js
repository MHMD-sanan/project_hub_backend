/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const DeveloperSchema = require("../../models/developer/developerSchema");

module.exports.refreshToken = async (req, res) => {
  try {
    const { cookies } = req;
    if (!cookies?.Dev_jwt) return res.sendStatus(401);
    const refreshToken = cookies.Dev_jwt;
    const foundDeveloper = await DeveloperSchema.findOne({ refreshToken });
    if (!foundDeveloper) return res.sendStatus(403); // Forbidden
    // evalute jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        const dbEmail = foundDeveloper.email.toString();
        const decodedEmail = decoded.email.toString();
        if (error || dbEmail !== decodedEmail) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 60 }
        );
        res.json({ status: true, accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
