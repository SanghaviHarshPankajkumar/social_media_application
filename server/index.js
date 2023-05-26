import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/posts.js';
import userRouter from './routes/user.js';
const app  = express()
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use('/posts',router);
app.use('/user',userRouter);
const PORT = process.env.PORT || 5000;
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
app.listen(PORT,()=> console.log(`server is running in ${PORT}...`))
}).catch((err)=>{
   console.error(err.message);
})

