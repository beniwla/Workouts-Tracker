import {createContext, useReducer} from 'react'

export const WorkoutsContext = createContext();

export const WorkoutsReducer= (state, action)=>{
    switch (action.type){
        case 'CREATE_WORKOUT' :
            return{
                workouts: [action.payload , ...state.workouts]
            }

        case 'SET_WORKOUTS' :
            return{
                workouts: action.payload
            }  
        
        case 'DELETE_WORKOUT' :
            return {
                workouts: state.workouts.filter((w)=>
                    w._id !== action.payload._id
                )
            }

        default: return state
    }
}

export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch]= useReducer(WorkoutsReducer,{
        workouts: null
    })

    // dispatch({ type: 'CREATE_WORKOUT', payload: [{},{}] })

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkoutsContext.Provider>
    
  )
}

