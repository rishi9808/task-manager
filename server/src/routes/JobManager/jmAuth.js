import express from "express";
import { jobManagerModel } from "../../models/jobManagers.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//use http://localhost:3002/jmauth 
const router = express.Router();

router.post("/register", async function (req, res) {
    console.log(req.body);
    const { fullName,userName, passWord,orgName } = req.body;
    const jm = await jobManagerModel.findOne({ userName: userName });

    if (jm) {
        return res.json({ message: "username already exist" });
    }
    const hashPassword = await bcrypt.hash(passWord, 10);
    const newJm = new jobManagerModel({ fullName,userName, passWord: hashPassword,orgName });
    await newJm.save();
    res.json({ message: "User registered successfully" });

})

router.post("/login", async function (req, res) {
    //console.log("Req recieved when try to login is",req.body);
    const { userName, passWord } = req.body;
    const jm = await jobManagerModel.findOne({ userName });
    if (!jm) {
        return res.json({ message: "User does not exist" });
    }
    const isValid = await bcrypt.compare(passWord, jm.passWord);
    if (!isValid) {
        return res.json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: jm._id }, "secret");
    res.json({ message: "You are successfully logined in", token: token, userId: jm._id });
})





export { router as jmAuthRouter };