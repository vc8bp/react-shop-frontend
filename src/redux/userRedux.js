import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null ,
        address: null,
        isFetching: false,
        isError: false,
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
            state.address = null;
        },
        resetError: (state) => {
            state.error = null;
            state.isError = null;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
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
            state.isError = action.payload;
            
        },
        
    
        

        //signup
        
        signUpSucces: (state, action) => {
            state.isFetching = false;
            state.isError = false; 
            state.currentUser = action.payload;
            
            
            
        },
        signupFailed: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            
        },
        
    }
})

export const { Start, loginSucces, Failed, logoutUser, signUpSucces, signupFailed, resetError, setAddress } = userSlice.actions;
export default userSlice.reducer;