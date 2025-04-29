
import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle]= useState('')
    const [load, setLoad]= useState('')
    const [reps, setReps]= useState('')
    const [error, setError] = useState(null)

    const { user }= useAuthContext();

    const delay = async (d)=>{
        return new Promise((res,rej)=>{
            setTimeout(() => {
                res();
            }, d*1000);
        })
    }

    const handleSubmit= async (e)=>{
        
        e.preventDefault();

        // await delay(4);

        if(!user){
            setError('You must be Logged in')
            return
        }
 
        const workout= {title,load,reps};

        const res= await fetch("${process.env.REACT_APP_BACKEND_URL}/api/workouts", {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json= await res.json();

        if(!res.ok){
            setError(json.error)
        }
        else{
            setReps('')
            setTitle('')
            setError(null)
            setLoad('')
            console.log('New workout added', json)
            dispatch({type:'CREATE_WORKOUT' , payload: json})
        }

    }


  return (

    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title: </label>
        <input placeholder="Title" type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} />

        <label>Load (in Kgs): </label>
        <input placeholder="Load" type="number" onChange={(e)=>{setLoad(e.target.value)}} value={load} />

        <label>Reps: </label>
        <input placeholder="Reps" type="number" onChange={(e)=>{setReps(e.target.value)}} value={reps} />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}

    </form>
    
  )
}

export default WorkoutForm
