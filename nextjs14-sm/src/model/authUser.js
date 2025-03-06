import mongoose from "mongoose"

const AuthUserSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
});


const AuthUsers = mongoose.models.AuthUsers || mongoose.model("AuthUsers", AuthUserSchema);

export default AuthUsers;
