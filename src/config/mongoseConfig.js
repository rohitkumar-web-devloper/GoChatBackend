const mongoose = require("mongoose")
// const db = "mongodb+srv://Gochat:Gochat1234@gochat.gct79ld.mongodb.net/Gochat?retryWrites=true&w=majority"   
const db = "mongodb://localhost:27017/Testing"
const connection = mongoose.connect(db).then(() => {
    console.log("Database Connection is sucessfully")
}).catch(() => {
    console.log("Database Connection is not complete")
})
module.exports = {
    connection
}