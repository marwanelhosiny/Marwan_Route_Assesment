import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import * as cc from "./category.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { addcategorySchema, deletecategorySchema, getcategorySchema, updatecategorySchema } from "./category.schemas.js";

const router = Router()

router.post('/',validationFunction(addcategorySchema),auth(),expressAsyncHandler(cc.addCategory))
router.put('/:categoryId',validationFunction(updatecategorySchema),auth(),expressAsyncHandler(cc.updateCategory))
router.delete('/:categoryId',validationFunction(deletecategorySchema),auth(),expressAsyncHandler(cc.deleteCategory))
router.get('/',auth(),expressAsyncHandler(cc.getMyCategory))
router.get('/:categoryId', validationFunction(getcategorySchema),auth(),expressAsyncHandler(cc.getCategory))










export default router