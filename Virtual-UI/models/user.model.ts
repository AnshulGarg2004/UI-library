import mongoose  from "mongoose";

export interface Iuser {
    name : string;
    _id? : string;
    email : string,
    role : "user" | "admin";
    aiCredits : number;
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        requred : true,
        unique : true,
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    aiCredits : {
        type : Number,
        default : 200
    }
}, {timestamps : true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;