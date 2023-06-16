const router=require("express").Router();
const User=require("../models/User")
const Post=require("../models/Post")

//CREATE POST
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body);//creating an instance(newPost) of the Post model ,newPost is an object
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost); 
    }
    catch(err){
        res.status(500).json(err);
    }
}); 

//UPDATE POST
router.put("/:id",async(req,res)=>{
   try
   {
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username)
        {
            try
            {
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body //updating the post and storing that in updatedPost
                    },
                    {new:true}//if we dont write this then updatedPost variable stores the initial post and not the updated post
                ); 
                res.status(200).json(updatedPost);
            }
            catch(err)
            {
                console.log(err)
                res.status(500).json(err);  
            }
        }
        else{
            res.status(401).json("You can update only your post!");
        }
   }
   catch(err){
        res.status(500).json(err)
   }
});
//DELETE POST
router.delete("/:id",async(req,res)=>{
    try
    {
         const post=await Post.findById(req.params.id);   
         if(post.username===req.body.username)
         {
             try
             {
                 await Post.findByIdAndDelete(req.params.id);
                 res.status(200).json("Post has been deleted...");
             }
             catch(err)
             {
                 console.log(err)
                 res.status(500).json(err);  
             }
         }
         else{
             res.status(401).json("You can delete only your post!");
         }
    }
    catch(err){
         res.status(500).json(err)
    }
 });
//GET POST
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL POSTS
router.get("/",async(req,res)=>{    
    const username1=req.query.user// if the URL is /user?user=johndoe, then username will be assigned the value "johndoe"
    const catName=req.query.cat//if the URL is /user?cat=fluffy, then catName will be assigned the value "fluffy".
    //This line extracts the value of the "cat" parameter from the query string of the URL, using req.query.cat. It assigns the value to the catName variable.
    try{    
        let posts;
        if(username1){
            posts=await Post.find({username:username1}); 
        }
        else if(catName){
            posts=await Post.find({categories:{
                $in:[catName],
            }});
        }
        else{   
            posts=await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;