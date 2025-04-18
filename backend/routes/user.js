import express from "express";

import { loginUser, signupUser, getallUsers } from "../controllers/userController.js";

// instance of express router
const router= express.Router();

//get all users
router.get('/', getallUsers)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)



export default router