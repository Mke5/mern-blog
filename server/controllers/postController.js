const Post = require('../models/postModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
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
    try{
        if(!req.params.id){
            return next(new HttpError('Post ID is required', 400))
        }
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            const post = await Post.findById(req.params.id).populate('userId', 'name email')
            if(!post){
                return next(new HttpError('Post not found', 404))
            }
            res.status(200).json(post)
        }else {
            return res.status(400).json({ error: 'Invalid post ID' })
        }
    }catch(error){
        return next(new HttpError(error.message, error.statusCode))
    }
}


const getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find().sort({createdAt: -1}).populate('userId', 'name email')
        if(!posts || posts.length === 0){
            return next(new HttpError('No posts found', 404))
        }
        res.status(200).json(posts)
    }catch(error){
        return next(new HttpError(error.message, error.statusCode))
    }
}



const getCatPosts = async (req, res, next) => {
    try{
        if(!req.params){
            return next(new HttpError('No parameters provided', 400))
        }
        const {category} = req.params
        if(!category){
            return next(new HttpError('Category is required', 400))
        }

        const posts = await Post.find({category}).sort({createdAt: -1}).populate('userId', 'name email')
        if(!posts || posts.length === 0){
            return next(new HttpError('No posts found for this category', 404))
        }
        res.status(200).json(posts)
    }catch(error){
        return next(new HttpError(error.message, error.statusCode))
    }
}




const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id){
            return next(new HttpError('User ID is required', 400))
        }

        const user = await User.findById(id)
        if(!user){
            return next(new HttpError('User not found', 404))
        }

        const posts = await Post.find({userId: id}).sort({createdAt: -1}).populate('userId', 'name email')
        if(!posts || posts.length === 0){
            return next(new HttpError('No posts found for this user', 404))
        }

        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error.message, error.statusCode))
    }
}




const editPost = async (req, res, next) => {
    res.json('edit post')
}




const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        if (!id) {
            return next(new HttpError('Post ID is required', 400));
        }
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }
    
        const post = await Post.findById(id);
        if (!post) {
            return next(new HttpError('Post not found', 404));
        }
        if (!post.userId.equals(req.user.id)) {
            return next(new HttpError('You are not authorized to delete this post', 403));
        }
        await Post.findByIdAndDelete(id);
        await User.findByIdAndUpdate(req.user.id, { $inc: { posts: -1 } });
        const imagePath = path.join(__dirname, '..', 'uploads', post.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
            console.error('Failed to delete image file:', err);
            }
        });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      return next(new HttpError(error.message || 'Something went wrong', 500));
    }
};



module.exports = { createPost, deletePost, editPost, getCatPosts, getPosts, getPost, getUserPosts}