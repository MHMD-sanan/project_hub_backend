
const Chat = require("../../models/developer/Chat");
const developerSchema = require("../../models/developer/developerSchema");
const Message = require("../../models/developer/Message");

module.exports.fetchChats = async (req, res) => {
  try {
    Chat.find({
      developers: { $elemMatch: { $eq: req.body.id } },
    })
      .populate("developers", "-projects")
      .populate("project")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (chats) => {
        chats = await developerSchema.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(chats);
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!(content || chatId)) res.sendStatus(400);
    const newMessage = {
      // eslint-disable-next-line no-underscore-dangle
      sender: req.developer._id,
      content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name imgPath");
    message = await message.populate("chat");
    message = await developerSchema.populate(message, {
      path: "chat.developers",
      select: "name imgPath email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    const chats = await Chat.find({
      developers: { $elemMatch: { $eq: req.developer._id } },
    })
      .populate("developers", "-projects")
      .populate("project")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.json({message,chats});
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports.allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name imgPath email").populate("chat");
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
}
