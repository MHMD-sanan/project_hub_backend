/* eslint-disable no-console */
const KanbanSchema = require("../../../models/project/Kanban");
const { getKanban } = require("../../../helpers/developer/getKanban");

module.exports.getKanban = async (req, res) => {
  try {
    const { id } = req.body;
    const projectId = id.toString();
    const kanban = await getKanban(projectId);
    res.json({ status: true, kanban });
  } catch (error) {
    res.json({ status: false, message: "error.message" });
  }
};

module.exports.addBoard = async (req, res) => {
  try {
    const { name, id, privileges } = req.body;
    await KanbanSchema.updateOne(
      { projectId: id },
      { $push: { boards: { title: name, privileges } } }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    res.json({ status: false, message: "error.message" });
  }
};

module.exports.updateBoard = async (req, res) => {
  try {
    const { value, privileges, boardId, id } = req.body;
    const filter = { projectId: id };
    const update = { $set: { 'boards.$[board].title': value,'boards.$[board].privileges': privileges } };
    const options = {
      new: true,
      arrayFilters: [{ 'board._id': boardId }],
    };
    await KanbanSchema.updateOne(filter,update,options);
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBoard = async (req, res) => {
  try {
    const { id, taskId } = req.body;
    await KanbanSchema.updateOne(
      { projectId: id },
      { $pull: { boards: { _id: taskId } } }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    console.log(error);
  }
};

module.exports.saveDrag = async (req, res) => {
  try {
    const { id, tempBoards } = req.body;
    await KanbanSchema.updateOne(
      { projectId: id },
      { $set: { boards: tempBoards } }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    console.log(error);
  }
};
