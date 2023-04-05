/* eslint-disable arrow-body-style */
const KanbanSchema = require("../../models/project/Kanban");

module.exports.getKanban = (id) => {
  return KanbanSchema.findOne({ projectId: id });
};
