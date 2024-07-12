import { Schema, model } from "mongoose";
import { systemRoles } from "../../src/utils/system-roles.js";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        tirm: true,
        lowercase: true
    },
    fullName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        tirm: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        tirm: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP:{
        type: String,
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    token:{
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', function(){

    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
    
})

const User = model('User', userSchema)
export default User