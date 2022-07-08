const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({path: "./config.env"});

mongoose.connect(process.env.DB || "mongodb+srv://emarche:kartik4002@cluster0.1jsvxys.mongodb.net/crud?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log(err))

const dataSchema = new mongoose.Schema({
    head: {type: String},
    body: {type: String}
})

const Data = mongoose.model("data", dataSchema);

 module.exports = Data