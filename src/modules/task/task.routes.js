import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import * as sc from "./task.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/system-roles.js";
import { validationFunction } from "../../middlewares/validation.middleware.js";
import { addTaskSchema, deletetaskSchema, updatetaskSchema } from "./task.schemas.js";

const router = Router()

router.post('/:categoryId',  validationFunction(addTaskSchema), auth(), expressAsyncHandler(sc.addTask))
router.put('/:taskId',  validationFunction(updatetaskSchema), auth(), expressAsyncHandler(sc.updateTask))
router.delete('/:taskId', validationFunction(deletetaskSchema), auth(), expressAsyncHandler(sc.deleteTask))
router.get('/', expressAsyncHandler(sc.getAllsubCategories))
router.get('/oneSubCategory/:subCategoryId', validationFunction(), expressAsyncHandler(sc.getSubCategory))












export default router