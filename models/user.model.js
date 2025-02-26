import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {timestamps: true});


const User =   models.User || new mongoose.model("User", userSchema);

export default User;