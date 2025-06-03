const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')


// register user controller
const registerUser = async (req, res, next) => {
    try {
        if(!req.body){
            return next(new HttpError('Fill in all Fields', 422))
        }
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

        const salt = await bcrypt.genSalt(12)
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
    try {
        const {id} = req.params
        const user = await User.findById(id).select('-password')
        if(!user){
            return next(new HttpError('User not found', 404))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error, error.statusCode))
    }
}



// change user profile picture {protected}
const changeAvatar = async (req, res, next) => {
    try{
        if(!req.user || !req.user.id){
            return next(new HttpError('Cannot identify user', 401))
        }

        if(!req.files){
            return next(new HttpError('PLease choose an image', 422))
        }

        const user = await User.findById(req.user.id)
        if (!user) {
            return next(new HttpError('User not found', 404));
        }
        if(user.avatar){
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err){
                    return next(new HttpError(err, err.statusCode))
                }
            })
        }

        const {avatar} = req.files
        if(avatar.size > 500000){
            return next(new HttpError('file size greater than 500kb', 422))
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(avatar.mimetype)) {
            return next(new HttpError('Only image files are allowed (jpeg, png, gif, webp)', 422));
        }

        const fileExt = path.extname(avatar.name);
        const safeBaseName = path.basename(avatar.name, fileExt).replace(/[^a-zA-Z0-9_-]/g, '');
        const newFileName = `${safeBaseName}-${uuid()}${fileExt}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFileName);

        avatar.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError('Failed to upload image', 500));
            }

            user.avatar = newFileName;
            await user.save();

            res.status(200).json({ message: 'Avatar updated successfully', avatar: newFileName });
        });

    }catch(error){
        return next(new HttpError(error, error.statusCode))
    }
}


// edit user details {protected}
const editUser = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(new HttpError('Fill all fields!', 422));
        }

        const { name, email, currentPassword, newPassword, confirmPassword } = req.body;

        if (!name || !email || !currentPassword || !newPassword || !confirmPassword) {
            return next(new HttpError('Fill all fields!', 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError('User not found', 404));
        }
        if (user.email !== email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return next(new HttpError('Email already in use by another account', 409));
            }
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return next(new HttpError('Incorrect current password', 401));
        }
        if (newPassword !== confirmPassword) {
            return next(new HttpError('New passwords do not match', 422));
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return next(new HttpError(error.message || 'Server Error', 500));
    }
};


// get all authors
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password')
        res.status(200).json(authors)
    } catch (error) {
        return next(new HttpError(error, error.statusCode))
    }
}




module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}