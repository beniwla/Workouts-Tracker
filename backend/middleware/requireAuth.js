import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';

export const requireAuth= async (req, res, next)=>{

    // verify authentication
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error:' Authorization token required'})
    }
 
    const token =authorization.split(' ')[1]

    try {

        const { _id }= jwt.verify(token, process.env.SECRET)

        // this line attaches user info to the request object cause 
        // thats what middleware does
        //  The idea of middleware is to prepare data that route handler will need later
        req.user= await User.findOne({ _id }).select('_id')

        // pass control to next middleware or route handler
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: ' Request is not Authorized'})
    }

}