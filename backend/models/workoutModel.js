
// as this library helps us to allow to create schemas nd all 
// as Mongodb alone is schema-less
import mongoose from "mongoose"; 

const Schema = mongoose.Schema; // function to create schema

const workoutSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

export const Workout = mongoose.model('Workout', workoutSchema);

// schema defines the structure of a particular document
// model applies that schema to a particular model and then
// we use the model to interact with a collection of that name