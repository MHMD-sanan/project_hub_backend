const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  domain: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique:true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  imgPath: String,
  status: {
    type: Boolean,
    default: true,
  },
  projects: [
    {
      projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
      },
      role: {
        type: String,
        default: "Developer",
      },
    },
  ],
  refreshToken:String,
});

module.exports = mongoose.model("Developers", developerSchema);
