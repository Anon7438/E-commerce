const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDatabase = ( ) =>{
    mongoose.connect(process.env.Db_Url,{useNewUrlParser:true}).then((data)=>{
        console.log(`mongodb connected with server ${data.connection.host}`)
        })
}

module.exports = connectDatabase