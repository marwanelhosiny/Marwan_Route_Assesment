import * as routes from './modules/routes.js'
import db_connection from '../DB/connection.js'
import { globalResponse } from '../src/middlewares/globalResponse.js'




export const initiateApp = (express,app)=>{


const port = process.env.PORT
db_connection()



app.use(express.json())

app.use('/user',routes.userRouter)
app.use('/category',routes.categoryRouter)
app.use('/task',routes.taskRouter)

app.use('/success',(req,res,next)=>{res.status(200),res.json({message:'success'})})
app.use('/cancel',(req,res,next)=>{res.status(400),res.json({message:'cancel'})})
app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not Found' })
})


app.use(globalResponse)


const expressServer=app.listen(port, () => console.log(`app listening on port ${port}!`))

}