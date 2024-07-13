import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import * as tc from "./task.controller.js"
import { auth } from "../../middlewares/auth.middleware.js";

import { validationFunction } from "../../middlewares/validation.middleware.js";
import { addTaskSchema, deletetaskSchema, getTaskSchema, updatetaskSchema } from "./task.schemas.js";

const router = Router()

router.post('/:categoryId',  validationFunction(addTaskSchema), auth(), expressAsyncHandler(tc.addTask))
router.put('/:taskId',  validationFunction(updatetaskSchema), auth(), expressAsyncHandler(tc.updateTask))
router.delete('/:taskId', validationFunction(deletetaskSchema), auth(), expressAsyncHandler(tc.deleteTask))
router.get('/public', expressAsyncHandler(tc.getPublicTasks))
router.get('/', auth(), expressAsyncHandler(tc.getMyTasksCategorised))
router.get('/:taskId', validationFunction(getTaskSchema) , auth() , expressAsyncHandler(tc.getTask))












export default router