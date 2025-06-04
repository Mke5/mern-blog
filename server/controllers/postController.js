



const createPost = async (req, res, next) => {
    res.json('create posts')
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