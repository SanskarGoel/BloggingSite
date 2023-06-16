const router=require("express").Router(); //creates new router object to handle requests    
const User=require("../models/User")
const bcrypt=require('bcrypt');

//REGISTER
router.post("/register",async(req,res)=>{ //handles post request on this route(user will send post request to server and request will contain all that data required for registering user...response will be like you have been registered which is sent by server)
    try{
        const salt=await bcrypt.genSalt(10);//creates a 10 length unique string for password hashing
        const hashedPass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({ //This creates a new instance(newUser) of the User model,representing a new user (newUser is an object)
            username:req.body.username,
            email:req.body.email,
            password: hashedPass,
        })
        const user=await newUser.save();//this saves the newly created user instance to the database using the save() method provided by Mongoose. 
        //The saved user object is then assigned to the user variable.
        res.status(200).json(user)//sends a response to the user/client with user object(in json format)
    }catch(err){
        res.status(500).json(err);
    } 
})
//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("Wrong credentials!");
      }
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        return res.status(400).json("Wrong credentials!");
      }
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
// above line is used to export the router object from the module. By exporting the router object, other modules can import 
// it using the require function and use it to define routes or perform other routing-related operations.