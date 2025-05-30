import { Workout } from "../models/workoutModel.js";
import mongoose from "mongoose";

// get all workouts
export const getAllWorkouts = async (req,res)=>{
    const user_id= req.user._id;

    const workouts= await Workout.find({user_id}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

// get a single workout
export const getWorkout = async (req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error: 'No such workout'})
    }

    const workout= await Workout.findById(id)

    if(!workout){
        return req.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout);
}

// create new workout
export const createWorkout = async (req,res)=>{
    const { title, load, reps}= req.body;
    const user_id= req.user._id;

    // add doc to DB
    try{
        const workout=  await Workout.create({title,load,reps,user_id});
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'POST a new workout'})- will give error
}


// delete a workout
export const deleteWorkout = async (req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error: 'No such workout'})
    }

    const workout= await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return req.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout);
}

// update a workout
export const updateWorkout = async (req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error: 'No such workout'})
    }

    const workout= await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!workout){
        return req.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout);
}