import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";


//instance of an express app
const app= express();

//middleware
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

const PORT = process.env.PORT || 4000;

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// connect to DB- async in nature as takes bit of a time to do
mongoose.connect("mongodb://localhost:27017/")
.then(()=>{

    // listen for requests
    app.listen(PORT, ()=>{
        console.log(`Connected to DB & Listening on PORT ${PORT}!`);
    })

}).catch((error)=>{
    console.log(error)
})

