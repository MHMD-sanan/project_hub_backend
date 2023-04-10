const jwt = require("jsonwebtoken");
const DeveloperSchema = require("../../models/developer/developerSchema");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const details = await DeveloperSchema.findOne({ email }).populate(
      "projects.projectId"
    );
    if (details && details.password === password && details.status===true) {
      // jwt implementation
      const accessToken = jwt.sign(
        { email: details.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      const refreshToken = jwt.sign(
        { email: details.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      // saving saving refresh token in database
      details.refreshToken = refreshToken;
      await details.save();
      res.cookie("Dev_jwt", refreshToken, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ details, status: true, accessToken });
    } else {
      res.json({ status: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};
