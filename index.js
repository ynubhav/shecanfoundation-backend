import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./db.js";
import connectdb from "./config/db.js";
import jwtmiddleware from "./middlewares/jwt.js";

dotenv.config();
connectdb();

const app = express();

app.use(cors());
app.use(express.json());
//signup
app.post("/signup", async (req, res) => {
  try {
    const user = req.body;
    //email name referralcode amountraised
    const email = user.email;
    const name = user.name;
    const phone = user.phone;
    const password = user.password;
    const referralcode = name.split(" ")[0] + "2025";
    const amountraised = Math.floor(Math.random() * 1000);
    const createuser = await User.create({
      email,
      name,
      phone,
      password,
      referralcode,
      amountraised,
    });
    console.log(createuser._id);
    const token = jwt.sign({ _id: createuser._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ message: "user created succesfully", token: `Bearer ${token}` });
  } catch (err) {
    res.status(401).json({ message: "email already in use" });
  }
});

//signin
app.get("/signin", async (req, res) => {
  try {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    const isUser = await User.find({ email: email, password: password });
    const founduser = isUser[0];
    if (!isUser.length) throw new Error("Something went wrong");
    const token = jwt.sign({ _id: founduser._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ message: "found user and logged in", token: `Bearer ${token}` });
  } catch (err) {
    res.status(402).json({ message: "couldnt find user" });
  }
});

//getuserdata
app.get("/me", jwtmiddleware, async (req, res) => {
  try {
    const id = req._id;
    const finduser = await User.findById(id);
    const userwoutpass=
    res.status(200).json({ message: "found you", me: finduser });
  } catch (err) {
    res.status(402).json({ message: "you arent in the db or logged_in" });
  }
});

//leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const allusers = await User.find({});
    allusers.sort((a, b) => a.amountraised - b.amountraised);
    allusers.reverse();
    res
      .status(200)
      .json({
        message: "succesfully feched leaderboard",
        leaderboard: allusers,
      });
  } catch (err) {
    res.status(402).json({ message: "couldnt fucmking find a user" });
  }
});

app.use((req,res)=>{
  res.json({message:"Server is live"});
})
app.listen(process.env.PORT, () => {
  console.log(`running on port :${process.env.PORT}`);
});
