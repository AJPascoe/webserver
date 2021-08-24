const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // this ensures input is considered to be json

app.get ("/", (req, res)=>{
    res.status(200).send("Hello world");
});

app.post("/register", async(req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    if (await bcrypt.compare(req.body.checkPassword, hash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }
});

app.post("/:username/", (req, res)=>{
    console.log(req.body);
    res.status(201).json({"message": `You created the repo ${req.body.project}`, "data": req.body});
});

app.get("/users/:username", (req, res) => {
    console.log(req.query);
    res.status(200).send(`You requested information about ${req.params.username}: ${req.query.age}`);
});

app.get("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You views the project ${req.params.project}`});
});

app.post("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You updated the project: ${req.params.project}`, "date": req.body});
});
app.listen(port, () => {
    console.log("App is online");
});