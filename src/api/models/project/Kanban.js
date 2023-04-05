const mongoose = require("mongoose");

const KanbanSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
  },
  boards: [
    {
      title: {
        type: String,
        required: true,
      },
      privileges:String,
      cards: [
        {
          title: String,
          desc: String,
          date: Date,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Kanban", KanbanSchema);
