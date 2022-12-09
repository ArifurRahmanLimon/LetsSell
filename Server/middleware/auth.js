import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    console.log("verify is called");
    try {
        let token = req.header("Authorization");

        if(!token) {
            console.log("no matched toekn");
            return res.status(403).send("Access Denied");
        }
        
        console.log("Ok,, find tokedn");

        if (token.startsWith("Bearer ")){
             token = token.slice(7, token.length).trimLeft();
        }

        console.log("Token verified");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified
        next();
    } catch(err) {
        console.log("Sorry not verified");
        res.status(500).json({error : err.message})
    }
}