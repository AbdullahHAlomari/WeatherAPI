import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router'

const app = express()
dotenv.config()

app.use(express.json())
const port = process.env.PORT
app.use(router)

app.listen(port, ()=>{
    console.log(`Server's running on: ${port}`);
    
})
