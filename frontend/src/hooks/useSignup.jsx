import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup= ()=>{
    const [error, setError]= useState(null)
    const [IsLoading, setIsLoading]= useState(null)
    const {dispatch}= useAuthContext()  

    const signup= async(email,password)=>{
        setIsLoading(true)
        setError(null)

        const res= await fetch('${process.env.REACT_APP_BACKEND_URL}/api/users/signup',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json= await res.json();

        if(!res.ok){
            setError(json.error)
            setIsLoading(false)
        }

        if(res.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN' , payload: json})

            setIsLoading(false)
        }
    }

    return {signup, error, IsLoading}
}

export default useSignup;