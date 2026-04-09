const jwt = require("jsonwebtoken")
const User = require('../User');
 
const userAuth = async(req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).send("Login Again");
 
        const msg = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const userId = msg.id;
        console.log(userId);
        console.log(msg);
        const user = await User.findById(userId);
        console.log(user);
        if(!user) throw new Error("User not found");
        req.user = user;
        next();
    }
    catch(err){
        res.status(404).send({message : "ERROR: " + err.message});
    }
}
module.exports = {userAuth};
 