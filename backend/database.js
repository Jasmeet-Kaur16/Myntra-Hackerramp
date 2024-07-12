const mongoose = require('mongoose');

//Database Connection
//mongodb://localhost:27017/EASYHR
const connectDatabase = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Myntra").then(con => {
        console.log(`MongoDb Database connect with HOST : ${con.connection.host}`)
    })
}

module.exports = connectDatabase