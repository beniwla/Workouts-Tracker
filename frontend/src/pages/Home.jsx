
import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails.jsx';
import WorkoutForm from '../components/WorkoutForm.jsx';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const Home = () => {

  const {workouts, dispatch}= useWorkoutsContext();
  const {user}= useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const res = await response.json();
  
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS' , payload: res })
        } 
        else {
          console.error('Error fetching workouts:', res);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    if(user){
      fetchWorkouts()
    }
    
  }, [dispatch, user])
  

  return (
    <>
    <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout)=>(
           <WorkoutDetails key={workout._id} workout={workout} />
           
          ))}  
        </div>
        <WorkoutForm/>
    </div>
    </>
  )
}

export default Home
