import express from "express";
import { studentModel } from "../../models/students.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//use http://localhost:3002/studentauth

const router = express.Router();

router.post("/register", async function (req, res) {
  console.log(req.body);
  const { fullName, userName, passWord, age, district, eli_status, skills } =
    req.body;
  //console.log("is it the district?" + district);
  const student = await studentModel.findOne({ userName });

  if (student) {
    return res.json({ message: "username already exist" });
  }
  const hashPassword = await bcrypt.hash(passWord, 10);
  const newStudent = new studentModel({
    fullName,
    userName,
    passWord: hashPassword,
    userName,
    age,
    district,
    eli_status,
    skills,
    
  });
  //console.log("The Data of new registered studenst is",newStudent);
  await newStudent.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async function (req, res) {
  //console.log("The req recieved to login for Student is",req.body);
  const { userName, passWord } = req.body;
  const student = await studentModel.findOne({ userName });
  if (!student) {
    return res.json({ message: "User does not exist" });
  }
  const isValid = await bcrypt.compare(passWord, student.passWord);
  if (!isValid) {
    return res.json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: student._id }, "secret");
  res.json({
    message: "You are successfully logined in",
    token: token,
    userId: student._id,
    savedJobs:student.savedJobs
  });
});

export { router as studentAuthRouter };
