/* eslint-disable no-underscore-dangle */
const ProjectSchema = require("../../models/project/projectScheme");
const KanbanSchema =require("../../models/project/Kanban");
const Chat = require("../../models/developer/Chat");

module.exports.addProjects = async (req, res) => {
    try {
      const { proName, proDes, proDate } = req.body;
      if(!(proName && proDes && proDate)){
        res.json({status:false,message:"Some fields are missing"});
      }
      const projectdata = new ProjectSchema({
        name: proName,
        description: proDes,
        date: proDate,
      });
  
      await projectdata.save();
      // setting kanban board
      const kanban=new KanbanSchema({
        projectId:projectdata._id
      })
      await kanban.save();
      // setting chat room
      const chatroom = new Chat({
        project: projectdata._id,
        isGroupChat:true
      })
      await chatroom.save();
    
      res.json({ status: true });
    } catch (error) {
      console.log(error);
    }
};
  
module.exports.getAllProjects = async (req, res) => {
    try {
      const projects = await ProjectSchema.find();
      res.json({ projects, status: true });
    } catch (error) {
      console.log(error);
    }
};

module.exports.viewSingleProject = async (req, res) => {
    try {
      const project = await ProjectSchema.findById(req.body.id)
        .populate("team.developerId")
        .populate("teamLead");
      res.json({ project, status: true });
    } catch (error) {
      console.log(error);
    }
};
  
module.exports.updateStatus = async (req, res) => {
  try {
    await ProjectSchema.findByIdAndUpdate(req.body.selectedProject, {
      $set: { status: req.body.status }
    });
    const project = await ProjectSchema.findById(req.body.selectedProject)
    .populate("team.developerId")
    .populate("teamLead");
  res.json({ project, status: true });
  } catch (error) {
    res.sendStatus(400);

  }
}