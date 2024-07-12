import Task from "../../../DB/models/task.model.js";
import generateUniequeString from "../../utils/generateUniqueString.js";
import Category from "../../../DB/models/category.model.js";
import { ApiFeatures } from "../../utils/api-features.js";




export const addTask = async(req, res, next) =>{
    //1- destructing the required data from request
    const { _id } = req.authUser
    const { categoryId } = req.params
    const { title, body, visiblity, dueDate, priority, type, items  } = req.body

    //2- checking if category exists
    const category = await Category.findOne({_id: categoryId , owner:_id})
    if (!category) { return next(new Error('category does not exist', { cause: 400 })) }

    //3- checking if task already exists
    const isExist = await Task.findOne({ title,type ,userId: _id })
    if (isExist) { return next(new Error('task already exists', { cause: 400 })) }

    //3- creating the task
    let task ;
        //3-1 if Text Task
        if(type === 'text'){
             task = await Task.create({ 
                title,
                body,
                visiblity,
                dueDate,
                priority,
                type,
                userId: _id,
                categoryId
            })
            if (!task) { return next(new Error('something went wrong', { cause: 400 })) }
        }
        //3-2 if list Task
        else if(type === 'list'){
             task = await Task.create({
                title,
                visiblity,
                dueDate,
                priority,
                type,
                items,
                userId: _id,
                categoryId
            })
            if (!task) { return next(new Error('something went wrong', { cause: 400 })) }
        }


    res.status(201).json({ message: 'task created successfully', task })
}


//============================================== update Task =================================//

export const updateTask = async(req, res, next) =>{
    //1- destructing the required data from request
    const { taskId } = req.params
    const { _id } = req.authUser
    const { title, body, visiblity, dueDate, priority, type, items  } = req.body

    //2- checking if task exists
    const task = await Task.findOne({_id: taskId , userId:_id})
    if (!task) { return next(new Error('task does not exist', { cause: 400 })) }

    //3- updating the task
    if(body) task.body = body
    if(title) task.title = title
    if(visiblity) task.visiblity = visiblity
    if(dueDate) task.dueDate = dueDate
    if(priority) task.priority = priority
    if(items && type === 'list'){
        task.items = items
    }
    //4- saving the task
    const updatedTask = await task.save()
    if (!updatedTask) { return next(new Error('something went wrong', { cause: 400 })) }
    res.status(200).json({ message: 'task updated successfully', updatedTask })

}

//============================================== delete Task =================================//

export const deleteTask = async(req, res, next) =>{

    const { taskId } = req.params
    const { _id } = req.authUser

    const task = await Task.findOneAndDelete({_id: taskId , userId:_id})
    if (!task) { return next(new Error('task does not exist', { cause: 400 })) }


    res.status(200).json({ message: 'task deleted successfully' })
}
