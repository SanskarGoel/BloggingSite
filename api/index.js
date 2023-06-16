const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose"); 
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const categoryRoute=require("./routes/categories")
const multer=require("multer")
const cors = require('cors');

dotenv.config();
app.use(express.json()) // to send an json file in response
// read whatsapp for better understanding of middlewares(use,get,post) and rest api
mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to MongoDB"))
.catch(err=>console.log(err));
app.use(cors())
const storage=multer.diskStorage({// This creates a storage configuration for multer using diskStorage.It takes an object with two functions as properties: destination and filename
    destination:(req,file,cb)=>{
        cb(null,"images")  // Set the destination directory for the uploaded files(over here destination is images folder)
    },filename:(req,file,cb)=>{
        cb(null,"hello.jpg")  // Set the filename for the uploaded file(here its static filneame)
    },
});
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})


app.use("/api/auth" ,authRoute); //like when we have written some backend login auth logic or registering in other file and want to use it in this file either we can directly write that code over here or take help of use command to use that logic here
// means at url /api/auth the logic written in authroute will be implemented
app.use("/api/users" ,userRoute);
app.use("/api/posts" ,postRoute);
app.use("/api/categories" ,categoryRoute);

app.listen("5000",()=>{
    console.log("Backend is running...")
})