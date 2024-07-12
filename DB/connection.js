import mongoose from "mongoose";


const db_connection= async()=>{
    await mongoose.connect(process.env.CONNECTION_URL_LOCAL)
    .then(()=>{console.log('db connected successfully')})
    .catch((err)=>{console.log("connection failed",err)})
}


export default db_connection