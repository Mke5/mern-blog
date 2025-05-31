// register user controller
const registerUser = async (req, res, next) => {
    res.json('register user')
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