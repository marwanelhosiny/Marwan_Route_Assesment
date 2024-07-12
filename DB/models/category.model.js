import { Schema, model } from "mongoose";

//============================== create the category schema ==============================//
const categorySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },

        owner: { type: Schema.Types.ObjectId, ref: 'user', required: true }, 

        description: { type: String }, 

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })



const Category = model('category', categorySchema)

export default Category


