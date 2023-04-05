const router = require("express").Router();
const { login } = require("../controllers/developer/auth");
const { updateProfile } = require("../controllers/developer/profile");
const {
  getKanban,
  addBoard,
  deleteBoard,
  updateBoard,
  saveDrag,
} = require("../controllers/developer/kanban/board");

const {
  addCard,
  deleteCard,
  updateCard,
} = require("../controllers/developer/kanban/card");

const { verifyJWT } = require("../middlewares/developer/verifyJWT");
const { refreshToken } = require("../helpers/developer/refreshToken");
const { fetchChats, sendMessage, allMessages } = require("../controllers/developer/Chat");

// login for developer
router.post("/login", login);
// for getting new accesstoken
router.get("/refresh", refreshToken);
// for developer logout
router.get("/logout", require("../controllers/developer/logout"));

// middle for verify JWT
router.use(verifyJWT);

// to update profile for developers
router.patch("/update_profile", updateProfile);
// get details of single project selected
router.post("/view_singleProject", getKanban);
// to add new board
router.patch("/add_board", addBoard);
// to delete a board
router.patch("/delete_board", deleteBoard);
// to update board
router.patch("/update_board", updateBoard);
// to add new card
router.patch("/add_card", addCard);
// to delete a card
router.patch("/delete_card", deleteCard);
// to update a card
router.patch("/update_card", updateCard);
// to save drag made by developer
router.patch("/save_drag", saveDrag);

// to get all chats
router.post("/get_full_chat", fetchChats);
// to send messages
router.post("/send_message", sendMessage);
// get all messages for single chat
router.get("/get_full_message/:chatId", allMessages)

module.exports = router;
