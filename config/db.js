import mongoose from "mongoose";

export default async function connectdb() {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log("connected to db");
  } catch (error) {
    console.log("cant connect");
  }
}
