import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema= mongoose.Schema;

const userSchema= new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//static signup method
//User.signup()-calling the function in controller

userSchema.statics.signup = async function(email,password){
    
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const exists= await this.findOne({email})
    // this keyword doesn't work in arrow function

    if (exists){
        throw Error('Email already in use')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    //mypasswordh86iuh78t
    //mypassworduy876tury
    //salt added at the end so that resulting 
    //hash is different even if the password is same

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email, password: hash})

    return user

}

userSchema.statics.signup = async function(email,password){
    
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const exists= await this.findOne({email})
    // this keyword doesn't work in arrow function

    if (exists){
        throw Error('Email already in use')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    //mypasswordh86iuh78t
    //mypassworduy876tury
    //salt added at the end so that resulting 
    //hash is different even if the password is same

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email, password: hash})

    return user

}

// static login method
userSchema.statics.login = async function(email,password){
    
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user= await this.findOne({email})
    // this keyword doesn't work in arrow function

    if (!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user

}


export const User= mongoose.model('User', userSchema)