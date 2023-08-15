const ChatModel = require("../model/chat")

class ChatService{
    async createMsg(data){
        const msg = await ChatModel.create(data)
        return msg
    }
    async findMsg(data){
        const msgs = await ChatModel.find(data)
        return msgs
    }
}

module.exports = new ChatService()