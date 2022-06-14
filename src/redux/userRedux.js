import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null ,
        isFetching: false,
        isError: false,
        isSignupError: false,
        error: null
    },
    reducers: {
        //default
        Start: (state) => {
            state.isError = false;
            state.isFetching = true;  
            state.error = null; 
        },
        logoutUser: (state) => {
            state.currentUser = null;
        },
        


        //login
        loginSucces: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isError = false;   
            console.log(action.payload)
        },

        Failed: (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.error = action.payload;
            
        },
        
    
        

        //signup
        
        signUpSucces: (state, action) => {
            state.isFetching = false;
            state.isError = false; 
            state.currentUser = action.payload;
            
            
            
        },
        signupFailed: (state, action) => {
            state.isFetching = false;
            state.isSignupError = true;
            state.error = action.payload;
            
        },
        
    }
})

export const { Start, loginSucces, Failed, logoutUser, signUpSucces, signupFailed } = userSlice.actions;
export default userSlice.reducer;