import Joi from "joi";
import { objectidValidation } from "../../utils/idValidator.js";


export const signupSchema = {
    body: Joi.object({
        username: Joi.string().min(3).max(15).required(),
        fullName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),

    })
}

export const signinSchema = {
    body: Joi.object({
        username: Joi.string().min(3).max(15).required(),
        password: Joi.string().min(6).max(20).required()
    })
}

export const userupdateSchema = {
    body: Joi.object({
        firstName: Joi.string().min(3).max(15),
        lastName: Joi.string().min(3).max(15),
        email: Joi.string().email(),
        recoveryEmail: Joi.string().email(),
        password: Joi.string().min(6).max(20),
        DOB: Joi.date(),
        role: Joi.string().valid('User', 'Company_HR'),
        mobileNumber: Joi.string()
    })
}

export const showprofileSchema = {
    params: Joi.object({
        _id: Joi.custom(objectidValidation).required()
    })
}

export const changepassSchema = {
    body: Joi.object({
        oldPass: Joi.string().min(6).max(20).required(),
        newPass: Joi.string().min(6).max(20).required(),
    })
}

export const forgetpasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
    })
}

export const resetpassSchema = {
    body: Joi.object({
        OTP: Joi.string().required(),
        email: Joi.string().email().required(),
        newPass: Joi.string().min(6).max(20).required()

    })
}