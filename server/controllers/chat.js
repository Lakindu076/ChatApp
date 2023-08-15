const chatService = require("../services/chatService");

class ChatController {
  async sendMsg(req, res) {
    const sender = req.user?._id;
    const { reciever, msg, msgType } = req.body;
    if (!sender || !reciever || !msg || !msgType) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      const createdMsg = await chatService.createMsg({
        sender,
        reciever,
        msg,
        msgType,
      });
      return res.status(200).json({ createdMsg });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }

  async getMsgs(req, res) {
    const { reciever } = req.body;
    const sender = req.user?._id;
    if (!sender || !reciever) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      const msgs1 = await chatService.findMsg({ sender, reciever });
      const msgs2 = await chatService.findMsg({
        sender: reciever,
        reciever: sender,
      });
      const msgs = msgs1.concat(msgs2);
      return res.status(200).json({ msgs });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error" });
    }
  }
}

module.exports = new ChatController();
