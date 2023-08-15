const UserModel = require('../model/user')

class UserService{
    async findUser(filter){
        const user = await UserModel.findOne(filter)
        return user
    }
    async createUser(data){
        const user = await UserModel.create(data)
        return user
    }
    async updateUser(_id,data){
        await UserModel.findByIdAndUpdate(_id,data)
    }
    async allUsers(){
        const data = await UserModel.find({})
        return data
    }
}

module.exports = new UserService()