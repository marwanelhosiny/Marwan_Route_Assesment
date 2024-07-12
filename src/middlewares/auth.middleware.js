import jwt from "jsonwebtoken"
import User from "../../DB/models/user.model.js"

//==================================================authentication middlleware========================================//
export const auth = () => {
    return async (req, res, next) => {
        const { accesstoken } = req.headers
        if (!accesstoken) { return next(new Error('missing access token', { cause: 400 })) }


        try {
            const verifiedToken = jwt.verify(accesstoken, process.env.ACCESSTOKEN_SECRET_KEY)

            if (!verifiedToken || !verifiedToken._id) { return next(new Error('invalid token payload', { cause: 400 })) }
            
            //checking if user is deleted or role updated while using an old valid token
            const stillExist = await User.findById(verifiedToken._id)
            if (!stillExist) { return next(new Error('please signUp first', { cause: 400 })) }

            req.authUser = stillExist

            next()

        } catch (error) {
            if (error.message === "jwt expired") {
                const findUser = await User.findOne({ token:accesstoken })
                if (!findUser) { return next(new Error('please login', { cause: 400 })) }
                const refreshedToken = jwt.sign({ email: findUser.email, username: findUser.username, _id: findUser._id }, process.env.ACCESSTOKEN_SECRET_KEY, { expiresIn: "1 d" })
                await User.updateOne({ _id: findUser._id }, { token: refreshedToken })
                return res.status(200).json({ message: "token refreshed", token: refreshedToken })
            }
            return next(new Error(`authentication error :${error.message}`, { casue: 400 }))
        }
    }
}