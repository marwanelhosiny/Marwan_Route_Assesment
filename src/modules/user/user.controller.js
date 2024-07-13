import User from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generateUniequeString from "../../utils/generateUniqueString.js"
import sendEmailService from "../services/send-email.service.js"

//============================================== register api =======================================//
export const signUp = async (req, res, next) => {

    //destructing enteries from req
    const { username,fullName, email, password } = req.body
    
    //checking if email duplicated
    const checkEmail = await User.findOne({ email })
    if (checkEmail) { return next(new Error('duplicated email', { cause: 400 })) }

    //checking if username duplicated
    const checkUsername = await User.findOne({ username })
    if (checkUsername) { return next(new Error('duplicated username', { cause: 400 })) }

    //creating document with all required data
    const addUser = new User({ username, fullName ,email, password })

    //password hashed by hooking
    await addUser.save()

    //send verification mail
    const usertoken = jwt.sign({ email }, process.env.USERTOKEN_SECRET_KEY, { expiresIn: "1 h" })
    
    const message = `<h1>hello</h1>
    <a href="${req.protocol}://${req.headers.host}/user/verify-email/?usertoken=${usertoken}">verify your email</a>`
    console.log('usert')
    const confirmMail =  await sendEmailService({ to: email, message })

    if (!confirmMail) {
        return res.status(500).json({ message: 'Failed to send verification email' });
    }

    return res.status(201).json({ message: 'user registered successfully' })

}

//================================================ verify-email =====================================//

export const verifyEmail = async (req, res, next) => {
    const { usertoken } = req.query

    const decodedData = jwt.verify(usertoken, process.env.USERTOKEN_SECRET_KEY)
    if (!decodedData) { return next(new Error('usertoken expired', { cause: 400 })) }

    const isEmailExist = await User.findOneAndUpdate({ email: decodedData.email, isVerified: false }, { isVerified: true }, { new: true })
    if (!isEmailExist) { return next(new Error('email you trying to verify not found', { cause: 400 })) }

    return res.status(200).json({ message: 'email verified successfully' })
}


//============================================= login api ==========================================//
export const signIn = async (req, res, next) => {
    const { username, password } = req.body

    //checking email accuaracy and changing status too
    const isExist = await User.findOne({ username, isVerified: true })

    if (!isExist) { return next(new Error('invalid credentials or not verified yet', { cause: 400 })) }

    //checking password accuaracy
    const checkPass = bcrypt.compareSync(password, isExist.password)
    if (!checkPass) { return next(new Error('invalid credentials', { cause: 400 })) }

    //creating token to send back in the response
    const { email ,fullName, _id } = isExist
    const token = jwt.sign({ email,fullName ,username, _id }, process.env.ACCESSTOKEN_SECRET_KEY, { expiresIn: "1 h" })

    //save token in db
    const updated = await User.findByIdAndUpdate({ _id:isExist._id }, { token })

    return res.status(200).json({ message: "you signed in successfully", token })
}



//=========================================== updatePassword api ===============================//
export const changePass = async (req, res, next) => {
    const { newPass, oldPass } = req.body
    const { _id } = req.authUser

    //check old pass
    const checkPass = bcrypt.compareSync(oldPass, req.authUser.password)
    if (!checkPass) { return next(new Error('invalid credentials', { cause: 400 })) }

    //hashing the new pass
    const hashedPass = bcrypt.hashSync(newPass, 9)


    //updating database
    const passUpdate = await User.updateOne({ _id }, { password: hashedPass })
    if (!passUpdate.modifiedCount) { return next(new Error('update failed', { cause: 400 })) }

    return res.status(200).json({ message: "password updated Successfully" })
}


//========================================== forgetPassword========================================//
export const forgetPassword = async (req, res, next) => {
    const { email } = req.body

    //check if email accurate
    const isExist = await User.findOne({ email })
    if (!isExist) { return next(new Error('invalid email', { cause: 400 })) }

    //set forget code and send it in email
    const OTP = generateUniequeString(4)
    

    await User.updateOne({ email }, { OTP })

    const message = `<h1>hello</h1>
    <h2>OTP:${OTP}</h2>`
    const confirmMail = sendEmailService({ to: email, message })

    return res.status(200).json({ message: "email sent successfully" })

}


//========================================== resetPass ========================================//

export const resetPass = async (req, res, next) => {
    const {email ,OTP , newPass } = req.body


    //find user
    const findUser = await User.findOne({ email,OTP })
    if (!findUser) { return next(new Error('user does not exist', { cause: 400 })) }


    //updating user with the new password
    findUser.password = newPass
    findUser.OTP = null
    await findUser.save()

    return res.status(200).json({ message: "password updated Successfully" })

}

//=========================================== deleteUser ======================================== //

export const deleteUser = async (req, res, next) => {
    const { _id } = req.authUser

    //deleting user and returning deleted document 
    const deleted = await User.findByIdAndDelete({ _id })
    if(!deleted) { return next( new Error('user does not exist', { cause:400}))}

    //deleting related categories
    const categories = await Category.deleteMany({ owner: _id })

    //deleting related tasks
    const tasks = await Task.deleteMany({ userId: _id })
    return res.status(200).json({ messsage: "user deleted successsfully", deleted })
}

