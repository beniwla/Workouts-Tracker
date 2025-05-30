
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; 

const WorkoutDetails = ({workout}) => {

  const {dispatch}= useWorkoutsContext();
  
  const { user }= useAuthContext();

  const handleClick= async ()=>{

    if(!user){
      return
    }

    const res= await fetch('${process.env.REACT_APP_BACKEND_URL}/api/workouts/' + workout._id , {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
  
    const json = await res.json();
    
    if(res.ok){
      dispatch({type: 'DELETE_WORKOUT' , payload: json})
    }
    
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps : </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails
