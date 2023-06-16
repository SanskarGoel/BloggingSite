const router=require("express").Router()
const Category=require("../models/Category")


router.post("/",async (req,res)=>{
    const newCat=new Category(req.body);
    try{
        const savedCat=await newCat.save()//saving to database
        res.status(200).json(savedCat)
    }
    catch{
        res.status(500).json(err)
    }
})

//FETCHING ALL CATEGORIES
router.get("/",async (req,res)=>{ 
    try{
        const cats=await Category.find();
        res.status(200).json(cats)
    }
    catch{
        res.status(500).json(err)
    }
})
module.exports=router;