const express = require("express");
const app = express();
const path = require("path");
const Data = require("./database")
const bodyParser = require("body-parser");
require("dotenv").config({path: "./config.env"});

app.use(bodyParser({extended: true}))
app.use(express.static(path.join(__dirname, "./public")))
app.set("view engine", "ejs");

app.get("/", async (req,res) => {
    const getData = await Data.find({});
    if(getData) {
        res.render("index", {data:getData})
    }
})

app.post('/post', async (req,res) => {
    const { head, body } = req.body;
    const add = new Data({head, body})
    const save = await add.save()
    if(save) {
        // res.json({msg: "inserted!"})
        res.redirect("/");
    }
})

app.post("/edit/:id", async (req,res) => {
    const id = req.params.id;
    const { head, body } = req.body;
    const edit = await Data.updateOne({_id: id}, {$set: {head, body}}) 
    if(edit) {
        // res.json("edited")
        res.redirect(`/view/${id}`)
    }
})

app.get("/delete/:id", async(req,res) => {
    const id = req.params.id;
    const delData = await Data.deleteOne({_id: id});
    if(delData) {
        res.redirect("/")
    }
})

app.get("/view/:id", async (req,res) => {
    const id = req.params.id;
    const viewData = await Data.findOne({_id: id})
    if(viewData) {
        // res.json({viewData})
        res.render("view", {note: viewData})
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})