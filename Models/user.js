// const { required, string } = require("joi");
const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");//Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
});
userSchema.plugin(passportLocalMongoose.default);// it automatic plugin the, salting,hashing,username,hashpswd

module.exports = mongoose.model("User", userSchema);