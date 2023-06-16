//BASIC CONCEPT OF CONTEXT API=>  (no need to deeply understand code)
//when we have multiple components in our project and login wala part bhi ek component hota hai, now when user
//logins then the rest of the application must get to know that the user is logged in so we have to display data
//accordingly like dont't display register and login options when user is logged in 
//so to tell rest components that user is logged in we have to pass props through all the necessary componets
//so this can make ou code complex to avoid it we can use context api which  
//By exporting the Context object, it can be accessed and used by other components within the application.
// Context APIs in React are a set of features that allow for global state management and sharing data between components without explicitly passing props through every level of the component tree
import Reducer from "./Reducer";
import {createContext,useEffect,useReducer} from "react";
// createContext is a function provided by the React library for creating a new context object.

const INITIAL_STATE={
    user: JSON.parse(localStorage.getItem("user")) || null , //using localStorage as when users refresh the page the users keeps logged in ,if localStorage not used then user will have to login again
    isFetching:false,
    error:false,
};
export const Context = createContext(INITIAL_STATE);
//This line creates a new context object using the createContext function. The createContext function takes
//an initial value, which in this case is the INITIAL_STATE object. The resulting context object is stored in the Context variable.
export const ContextProvider=({children})=>{//here children is all the componenets
    const [state,dispatch]=useReducer(Reducer,INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));//the localStorage.setItem() method is called to set the value of the "user" key in the localStorage. The JSON.stringify() function is used to convert the state.user value to a JSON string before storing it in localStorage
    },[state.user]);//This useEffect hook is triggered whenever the state.user value changes.
    return(
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    );
}