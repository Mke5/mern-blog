const User = require('../models/userModel')
const HttpError = require('../models/errorModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// register user controller
const registerUser = async (req, res, next) => {
    try {
        let {name, email, password, password2} = req.body

        if(!name || !email || !password){
            return next(new HttpError('Fill in all Fields', 422))
        }

        email = email.toLowerCase()

        const emailExist = await User.findOne({email: email})

        if(emailExist){
            return next(new HttpError('Email already exists!', 422))
        }
        if((password.trim()).length < 6){
            return next(new HttpError('Passwords should be at least 6  characters.', 422))
        }
        if(password != password2){
            return next(new HttpError('Passwords do not match.', 422))
        }

        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)


        const newUser = await User.create({name, email, password})
        res.status(201).json(`New User ${newUser.email} registered`)
    } catch (error) {
        return next(new HttpError(error, error.statusCode))
    }
}








// login user
const loginUser = async (req, res, next) => {
    try {
        let {email, password} = req.body
        
        if(!email || !password){
            return next(new HttpError('Fill all fields', 422))
        }

        email = email.toLowerCase()

        const user = await User.findOne({email: email})
        
        if(!user){
            return next(new HttpError('Invalid credentials', 422))
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            return next(new HttpError('Invalid credentials', 422))
        }

        const {_id: id, name} = user
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "2d"})

        res.status(200).json({token, id, name})
    } catch (error) {
        return next(new HttpError(error, error.statusCode))
    }
}


// user profile {protected}
const getUser = async (req, res, next) => {
    res.json('user profile')
}



// change user profile picture {protected}
const changeAvatar = async (req, res, next) => {
    res.json('user profile picture change')
}


// edit user details {protected}
const editUser = async (req, res, next) => {
    res.json('edit user')
}


// get all authors
const getAuthors = async (req, res, next) => {
    res.json('get all authors')
}




module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}