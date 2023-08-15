
//backend implementation of a Node.js application that uses Express.js for handling HTTP requests, 
//Socket.IO for real-time communication, and MongoDB for data storage. Let's break down the different parts of the code:
require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const router = require("./router");
const io = new Server(server, {
  cors: {
    origin: '*',
    method: ["GET", "POST"],
  },
});

app.use(cors())
app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

let arr = []

const addUserToArray = ({user,id})=> {
	const findUser = arr.find(e=> e?.user?._id === user?._id)
	if(findUser)return
	arr.push({user,id})
}

const removeUserFromArray = ({id}) => {
	arr = arr.filter(e=> e?.id !== id)
}

const getSocketIdFromUserID = ({id}) => {
	const find = arr.find(e=> e?.user?._id === id)
	return find?.id
}

io.on('connection',socket=> {
	const id = socket?.id
	socket.on('user-online',data=> {
		addUserToArray({user: data, id})
		io.emit('activeUsers',arr)
	})

	socket.on('send-msg',data=> {
		io.emit('rec-msg',{data,time: Date.now()})
	})

	socket.on('disconnect',()=> {
		removeUserFromArray({id})
		io.emit('activeUsers',arr)
	})
})

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
