/* eslint-disable no-underscore-dangle */
const DeveloperSchema = require("../../models/developer/developerSchema");

module.exports.addDeveloper = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imgPath =
      "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    const developer = new DeveloperSchema({
      name,
      email,
      password,
      imgPath,
      domain: "",
    });
    await developer.save();
    res.json({ status: true });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ status: false, message: "Email already exists" });
    }
  }
};

module.exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await DeveloperSchema.find();
    res.json({ developers, status: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateDeveloperStatus = async (req, res) => {
  try {
    const check = await DeveloperSchema.findOne({ _id: req.body.id });
    if (check.status) {
      await DeveloperSchema.findByIdAndUpdate(req.body.id, { status: false });
    } else {
      await DeveloperSchema.findByIdAndUpdate(req.body.id, { status: true });
    }
    const developers = await DeveloperSchema.find();
    res.json({ developers, status: true });
  } catch (error) {
    console.log(error);
  }
};

