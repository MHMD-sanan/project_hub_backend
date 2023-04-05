const KanbanSchema = require("../../../models/project/Kanban");
const { getKanban } = require("../../../helpers/developer/getKanban");

module.exports.addCard = async (req, res) => {
  try {
    const { boardId, title, id } = req.body;
    const newCard = {
      title,
      date: "",
      desc: "",
    };
    await KanbanSchema.findOneAndUpdate(
      { projectId: id, "boards._id": boardId },
      { $push: { "boards.$.cards": newCard } }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const { boardId, cardId, id } = req.body;
    await KanbanSchema.updateOne(
      { "boards._id": boardId },
      { $pull: { "boards.$.cards": { _id: cardId } } }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.updateCard = async (req, res) => {
  try {
    const { bid, cid, card, id } = req.body;
    const test = await KanbanSchema.updateOne(
      // filter to find the correct board and card
      { projectId: id, "boards._id": bid, "boards.cards._id": cid },
      { 
         // update the card with the new values
        $set:{
          "boards.$.cards.$[card].title": card.title,
          "boards.$.cards.$[card].desc":card.desc,
          "boards.$.cards.$[card].date":card.date,          
        } 
      },
      {
        // specify the array filters to target the correct card
        arrayFilters: [{ "card._id": cid }]
      }
    );
    const kanban = await getKanban(id);
    res.json({ status: true, kanban });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
