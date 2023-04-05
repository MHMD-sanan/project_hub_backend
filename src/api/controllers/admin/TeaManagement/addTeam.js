const ProjectSchema = require("../../../models/project/projectScheme");
const DeveloperSchema = require("../../../models/developer/developerSchema");
const Chat = require("../../../models/developer/Chat");

module.exports.addTeam = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    const isExist = await ProjectSchema.find({
      _id: projectId,
      team: { $elemMatch: { developerId: userId } },
    });
    // check if developer already in team
    if (isExist.length !== 0) {
      res.json({ status: false, message: "This developer already in team" });
    } else {
      await ProjectSchema.findByIdAndUpdate(projectId, {
        $push: { team: { developerId: userId } },
      });
      // adding projects to developers db
      await DeveloperSchema.findByIdAndUpdate(userId, {
        $push: { projects: { projectId } },
      });
      // adding developer to chat room
      await Chat.findOneAndUpdate(
        { project: projectId },
        { $push: { developers: userId } }
      );

      const project = await ProjectSchema.findById(projectId)
        .populate("team.developerId")
        .populate("teamLead");

      res.json({ project, status: true });
    }
  } catch (error) {
    console.log(error);
  }
};
