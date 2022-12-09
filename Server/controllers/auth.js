import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/User.js";


/* Register user*/

export const register = async (req, res) => {

    console.log("register function is called");

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000) 

        });

        const savedUser = await newUser.save();
        console.log("ok registered");
        res.status(201).json(savedUser);
    }
    catch(err) {
        res.status(500).json({error : err.message});
        console.log("Sorry not registered");
    }
}

/* Loggin */
export const login = async (req, res) => {

    console.log("login file is called");
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email : email});
        if(!user) return res.status(400).json({msg : "User does not match"});

        console.log("User is find by login");

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) res.status(400).json({msg : "Invalid password"});

        console.log("Login password is matched");

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET);
        delete user.password;

        console.log("Successfully loged");
        res.status(200).json({token, user});
    } catch(err) {
        console.log("Error occured when user tried to logged");
        res.status(500).json({error : err.message});
    }
}