const router=require("express").Router();
const User=require("../models/User")//importing the UserSchema(code written in User.js).Here on LHS we can use an variable name not necessarily User
const Post=require("../models/Post")
const bcrypt=require("bcrypt");

//UPDATE
router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        if(req.body.password){ 
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);//upadting the password
        }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});//updating user  
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your account");
    }
     
});

//DELETE
router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        try{
            const user=await User.findById(req.params.id); 
            try{
                await Post.deleteMany({username: user.username});//deleting all the post of the user
                await User.findByIdAndDelete(req.params.id); //deleting user
                res.status(200).json("User has been deleted...");
            }catch(err){
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json("User not Found!")
        }
    }else{
        res.status(401).json("You can delete only your account");
    }
     
});
//GET USER
router.get("/:id",async(req,res)=>{ //basically a route has been created details corresponding to a specific userid will be displayed
    try{
        const user=await User.findById(req.params.id)
        const { password, ...others}=user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;