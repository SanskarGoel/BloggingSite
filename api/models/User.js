const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true
        },email:
        {
            type:String,
            required:true,
            unique:true
        },password:
        {
            type:String,
            required:true
        }
        ,profilePic:
        {
            type:String,
            default:""
        }
    },
    {timestamps:true}
);
module.exports=mongoose.model("User",UserSchema);//exporting model(UserSchema) by the name User(can be exported by name x also even if file name was User.js)
// use of 26th line -->
// The option {timestamps: true} in a Mongoose schema is used to automatically add two additional fields to 
// the documents in a collection: createdAt and updatedAt. These fields are automatically managed by Mongoose 
// and represent the creation and last update timestamps of the document, respectively.