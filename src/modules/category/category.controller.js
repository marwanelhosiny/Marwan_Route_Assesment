import Category from "../../../DB/models/category.model.js";

import Task from "../../../DB/models/task.model.js";




//========================================== add category =================================//
export const addCategory = async (req, res, next) => {
    //1- destructing the required data from request
    const { _id } = req.authUser
    const { name ,description} = req.body

    //2- checking if the name is already used
    const isExist = await Category.findOne({ name ,owner : _id})
    if (isExist) { return next(new Error('category already exist', { cause: 400 })) }

    //3- creating the category
    const categoryCreated = await Category.create({ name, description, owner: _id })
    if (!categoryCreated) { return next(new Error('something went wrong', { cause: 400 })) }

    req.savedDoc = { model: Category, _id: categoryCreated._id }

    res.status(200).json({ message: 'category added successfully', categoryCreated })
}


//========================================== update category =================================//
export const updateCategory = async (req, res, next) => {
    //1- destructing the required data from request
    const { _id } = req.authUser
    const { name , description } = req.body
    const { categoryId } = req.params

    //2- checking if category exists
    const category = await Category.findOne({ _id:categoryId , owner: _id })
    if (!category) { return next(new Error('category does not exist', { cause: 400 })) }

    //3- checking if the name sent and not the same old name and not already taken
    if (name) {
        if (name == category.name) { return next(new Error('name is typlcaly same as the old name', { cause: 400 })) }
        const isExist = await Category.findOne({ name })
        if (isExist) { return next(new Error('category already exist', { cause: 400 })) }
        category.name = name
    }

    //4-checking if the desc sent 
    if (description) category.description = description
    const updatedCategory = await category.save()

    if (!updatedCategory) { return next(new Error('something went wrong', { cause: 400 })) }



    res.status(200).json({ message: 'category updated successfully', updatedCategory })
}

//========================================== delete category =================================//

export const deleteCategory = async (req, res, next) => {
    //1- destructing the required data from request
    const { categoryId } = req.params

    //2- deleting the Category
    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    if (!deletedCategory) { return next(new Error('category not found', { cause: 400 })) }


    //4- deleting related tasks
    const deletedTasks = await Task.deleteMany({ categoryId })


    res.status(200).json({ message: 'Category deleted successfully', deletedCategory })

}

//========================================== get my categories =================================//

export const getMyCategory = async (req, res, next) => {
    const {_id}= req.authUser

    //1- getting all categories with their sub-categories
    const categories = await Category.find({owner : _id })
    if (!categories) { return next(new Error('something went wrong', { cause: 400 })) }

    res.status(200).json({ message: 'categories fetched successfully', categories })
}


//================================================= get category ====================//

export const getCategory = async (req, res, next) => {

    //1- destructing the required data from request
    const { categoryId } = req.params
    const { _id} = req.authUser

    //2- getting the category
    const category = await Category.findOne({ _id :categoryId , owner : _id })
    if (!category) { return next(new Error('category not found', { cause: 400 })) }

    res.status(200).json({ message: 'category fetched successfully', category })
}


