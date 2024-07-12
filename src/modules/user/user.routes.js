import { Router } from "express";
import * as ac from "./user.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { changepassSchema, forgetpasswordSchema, resetpassSchema, signinSchema, signupSchema, userupdateSchema } from "./user.schemas.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router()

router.post('/', validationFunction(signupSchema), expressAsyncHandler(ac.signUp))
router.get('/verify-email', expressAsyncHandler(ac.verifyEmail))
router.patch('/changePass', validationFunction(changepassSchema), auth(), expressAsyncHandler(ac.changePass))
router.post('/login', validationFunction(signinSchema), expressAsyncHandler(ac.signIn))
router.post('/forgetPass', validationFunction(forgetpasswordSchema), expressAsyncHandler(ac.forgetPassword))
router.post('/resetpass/', validationFunction(resetpassSchema), expressAsyncHandler(ac.resetPass))

/* router.put('/',validationFunction(userupdateSchema),auth(),expressAsyncHandler(uc.userUpdate))
router.delete('/',auth(),expressAsyncHandler(uc.userDelete))
router.get('/showMyData',auth(),expressAsyncHandler(uc.showMyData))
router.get('/profile/:_id',validationFunction(showprofileSchema),expressAsyncHandler(uc.showUserProfile))
router.post('/forgetPass',validationFunction(forgetpasswordSchema),expressAsyncHandler(uc.forgetPassword))
router.post('/recover',validationFunction(getUsersbyrecoveryemailSchema),expressAsyncHandler(uc.getUsersByRecoveryEmail)) */











export default router