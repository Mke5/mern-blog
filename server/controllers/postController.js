const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4, uuid} = require('uuid')
const HttpError = require('../models/errorModel')



const createPost = async (req, res, next) => {
    try{
        if(!req.body){
            return next(new HttpError('No data provided', 400))
        }

        let {title, category, description} = req.body
        if(!title || !category || !description || !req.files.image){
            return next(new HttpError('Please fill all fields', 400))
        }

        const {thumbnail} = req.files
        if(thumbnail.size > 1024 * 1024 * 2){ 
            return next(new HttpError('Image size should be less than 2MB', 400))
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(thumbnail.mimetype)) {
            return next(new HttpError('Only image files are allowed (jpeg, png, gif, webp)', 422));
        }
        const fileExt = path.extname(thumbnail.name);
        const safeBaseName = path.basename(thumbnail.name, fileExt).replace(/[^a-zA-Z0-9_-]/g, '');
        const newFileName = `${safeBaseName}-${uuid()}${fileExt}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFileName);

        thumbnail.mv(uploadPath, async (err) => {
            if(err){
                return next(new HttpError('Failed to upload image', 500))
            }else{
                const post = await Post.create({
                    title,
                    category,
                    description,
                    image: newFileName,
                    userId: req.user.id
                })

                if(!post){
                    return next(new HttpError('Failed to create post', 500))
                }

                const user = await User.findById(req.user.id)
                let postCount = user.posts + 1
                await User.findByIdAndUpdate(req.user.id, {posts: postCount})

                res.status(201).json(post)
            }
        })

    }catch(error){
        return next(new HttpError(error.message, error.statusCode))
    }
}


const getPost = async (req, res, next) => {
    res.json('get post')
}


const getPosts = async (req, res, next) => {
    res.json('getposts')
}



const getCatPosts = async (req, res, next) => {
    res.json('get categroy posts')
}




const getUserPosts = async (req, res, next) => {
    res.json('get user posts')
}




const editPost = async (req, res, next) => {
    res.json('edit post')
}




const deletePost = async (req, res, next) => {
    res.json('delete post')
}



module.exports = { createPost, deletePost, editPost, getCatPosts, getPosts, getPost, getUserPosts}