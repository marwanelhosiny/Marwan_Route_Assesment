import Joi from "joi"
import { objectidValidation } from "../../utils/idValidator.js"


export const addcategorySchema={
    body:Joi.object({
        name:Joi.string().min(2).max(20).required(),
        description:Joi.string()
    })
}
export const updatecategorySchema={
    body:Joi.object({
        name:Joi.string().min(2).max(20),
        description:Joi.string()
    }),
    params:Joi.object({
        categoryId:Joi.string().custom(objectidValidation)
    })
}

export const deletecategorySchema={
    params:Joi.object({
        categoryId:Joi.string().custom(objectidValidation)
    })
}

export const getcategorySchema={
    params:Joi.object({
        categoryId:Joi.string().custom(objectidValidation)
    })
}