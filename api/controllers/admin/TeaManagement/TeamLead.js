const ProjectSchema = require("../../../models/project/projectScheme");
const DeveloperSchema = require("../../../models/developer/developerSchema");

module.exports.addTeamLead = async (req, res) => {
  try {
    const { id, projectId } = req.body;
    const developerId = id.toString();
    // set team lead field
    await ProjectSchema.findByIdAndUpdate(projectId, { teamLead: developerId });
    
    // resetting role 
    await ProjectSchema.updateMany({},{$set:{"team.$[].role":"Developer"}});
    // change developer role inside team array in project side
    await ProjectSchema.updateOne(
      { "team.developerId": developerId },
      { $set: { "team.$.role": "Team Lead" } }
    );
    // changing developer role inside developer side
    await DeveloperSchema.updateOne(
      {_id:developerId,"projects.projectId":projectId},
      {$set:{"projects.$.role":"Team Lead"}}
    )

    const project = await ProjectSchema.findById(projectId)
      .populate("team.developerId")
      .populate("teamLead");

    // function getProjectDetails(proid){
    //   return ProjectSchema.findById(proid)
    //   .populate("team.developerId")
    //   .populate("teamLead");
    // }

    res.json({ project, status: true });
  } catch (error) {
    console.log(error);
  }
};