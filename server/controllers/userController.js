const User = require('../models/userModel')
const HttpError = require('../models/errorModels')
// const bcrypt = require('bcryptjs')

const bcrypt = ''

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
        res.status(201).json(newUser)
    } catch (error) {
        return next(new HttpError('User registration failed.', 422))
    }
}








// login user
const loginUser = async (req, res, next) => {
    res.json('login user')
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