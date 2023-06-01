const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true},
    password: String,
    createdAt: String,

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);