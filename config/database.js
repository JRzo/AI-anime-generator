// Here will the information for the database
const mongoose = require('mongoose')


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.DB_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
        })

        console.log("Mongoose DB", conn.connection.host)
    }
    catch(err){
        console.log(err)
        process.exit(1)

    }
}


module.exports =  connectDB;