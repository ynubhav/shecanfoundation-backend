import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 18,
  },

  phone: {
    type: String,
    trim: true,
    minLength: 10,
    maxLength: 10,
    match: /^[6-9]\d{9}$/,
  },
  password: {
    type: String,
    minLength: 5,
    trim: true,
    select: false
  },
  referralcode: String,
  amountraised: Number,
});

const User = mongoose.model("User", Userschema);

export { User };
