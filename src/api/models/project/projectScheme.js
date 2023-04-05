const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "not started",
  },
  team: [
    {
      developerId: {
        type: mongoose.Types.ObjectId,
        ref: "Developers",
      },
      role:{
        type:String,
        default:"Developer"
      }
    },
  ],
  teamLead:{
      type:mongoose.Types.ObjectId,
      ref:"Developers"
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
