import express from "express";
import { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } from "../controllers/workoutController.js";

// instance of an express router
const router = express.Router();

//GET all workouts
router.get('/', getAllWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

export default router;