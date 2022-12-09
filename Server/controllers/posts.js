import Post from "../models/posts.js";
import User from "../models/User.js";


export const createPost = async (req, res) => {

    console.log("Create post api is called");
    try {
        const {userId, description, picturePath} = req.body;
        { userId, description, picturePath }
        const user = await User.findById(userId);
        console.log("Find user");
        
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location : user.location,
            description,
            userPicture : user.picturePath,
            picturePath,
            likes : {},
            comments: []
        })

        await newPost.save();
        const post = await Post.find() ;
        
        console.log("Successfuly creted a post");
        res.status(201).json(post)
    } catch(err) {

        console.log("Sorry post is not created");
        res.status(409).json({message : err.message})
    }
}

export const getFeedPosts = async(req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post)

    } catch(err) {
        res.status(400).json({message : err.message});
    }
}

export const getUserPosts = async(req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post)

    } catch(err) {
        res.status(400).json({message : err.message});
    }
}

export const likePost = async (req, res) => {
    try {
        const {id} = body.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true}
        )

    } catch (err) {
        res.status(404).json({message : err.message})
    }
};

