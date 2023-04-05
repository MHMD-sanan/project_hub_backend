const asyncHandler = require("express-async-handler");
const DeveloperSchema = require("../../models/developer/developerSchema");
const projectScheme = require("../../models/project/projectScheme");

module.exports.dashboard = asyncHandler(async (req, res) => {
  const developersCount = await DeveloperSchema.find({}).count();
  const projectsCount = await projectScheme.find({}).count();
  const notStartedCount = await projectScheme.find({status:"not started"}).count();
  const startedCount = await projectScheme.find({status:"started"}).count();
  const dueCount = await projectScheme.find({status:"due"}).count();
  const completedCount = await projectScheme.find({status:"completed"}).count();
  res.send({
    developersCount,
    projectsCount,
    notStartedCount,
    startedCount,
    dueCount,
    completedCount,
  });
});
