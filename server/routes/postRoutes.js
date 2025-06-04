const {Router} = require('express')
const {createPost, deletePost, editPost, getCatPosts, getPosts, getUserPosts, getPost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.get('/', getPosts)
router.post('/', authMiddleware,  createPost)
router.get('/category/:category', getCatPosts)
router.get('/user/:id', getUserPosts)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)
router.get('/:id', getPost)

module.exports = router