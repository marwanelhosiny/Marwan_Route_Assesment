import Joi from "joi"
import { objectidValidation } from "../../utils/idValidator.js"


export const addTaskSchema = {
    body: Joi.object({
        title: Joi.string().trim().required(),
        body: Joi.string().trim(),
        visibility: Joi.string().valid('public', 'private').required(),  
        dueDate: Joi.date().iso(),  
        priority: Joi.string().valid('low', 'medium', 'high'),
        type: Joi.string().valid('text', 'list').required(),  
        items: Joi.when('type', {
            is: 'list',
            then: Joi.array().items(
                Joi.object({
                    body: Joi.string().required(),  
                    dueDate: Joi.date().iso() 
                })
            ),
            otherwise: Joi.forbidden()  
        }),
    }),
    params: Joi.object({
        categoryId: Joi.string().custom(objectidValidation).required() 
    })
};


export const updatetaskSchema = {
    body: Joi.object({
        title: Joi.string().trim(),
        body: Joi.string().trim(),
        visibility: Joi.string().valid('public', 'private'),
        dueDate: Joi.date().iso(),
        priority: Joi.string().valid('low', 'medium', 'high'),
        type: Joi.string().valid('text', 'list'),
        items: Joi.when('type', {
            is: 'list',
            then: Joi.array().items(
                Joi.object({
                    body: Joi.string(),
                    dueDate: Joi.date().iso()
                })
            ),
            otherwise: Joi.forbidden()
        }),
    }),
    params: Joi.object({
        taskId: Joi.string().custom(objectidValidation).required()
    })
};

export const deletetaskSchema={
    params:Joi.object({
        taskId:Joi.string().custom(objectidValidation)
    })
}

export const getTaskSchema={
    params:Joi.object({
        taskId: Joi.string().custom(objectidValidation)
    })
}