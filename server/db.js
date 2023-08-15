const mongoose = require('mongoose');
//Node.js module for establishing a connection to a MongoDB database using Mongoose.
const dbConnect = ()=> {
    mongoose.connect(process.env.DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    const db = mongoose.connection
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open',()=> {
        console.log('DB connected...')
    })
}

module.exports = dbConnect