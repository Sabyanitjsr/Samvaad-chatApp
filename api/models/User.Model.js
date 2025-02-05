import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
},{timestamps:true});

export const UserModel=mongoose.model('User',UserSchema);