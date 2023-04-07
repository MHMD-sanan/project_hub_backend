const ProjectSchema = require("../../../models/project/projectScheme");
const DeveloperSchema = require("../../../models/developer/developerSchema");
const Chat = require("../../../models/developer/Chat");

module.exports.deleteTeamMember = async (req, res) => {
  try {
    const { id, projectId } = req.body;
    const developerId = id.toString();
    const proId = projectId.toString();
    // removing developer from tema
    await ProjectSchema.updateOne(
      { _id: proId },
      { $pull: { team: { developerId } } }
    );
    // removing developer from chatroom
    await Chat.findOneAndUpdate(
      { project: projectId },
      { $pull: { developers: developerId } }
    );
    const project = await ProjectSchema.findById(projectId)
      .populate("team.developerId")
      .populate("teamLead");
    res.json({ project, status: true });
  } catch (error) {
    res.sendStatus(400);
  }
};
