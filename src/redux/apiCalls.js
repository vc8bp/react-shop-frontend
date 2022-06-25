import { Start, loginSucces, Failed, signUpSucces, signupFailed, resetError  } from './userRedux';
import { publicRequest } from '../axiosReqMethods';
//login
export const login = async ( dispatch, user ) => {
    const { email, password, ip } = user;
    console.log(ip)
    dispatch(Start())
    try {
        const res = await publicRequest.post("api/auth/login", {email, password})
        console.log(user)
        dispatch(loginSucces(res.data))
    
    } catch (error) {
        dispatch(Failed(error.response.data))

        //reseting error
        setTimeout(() => {
            dispatch(resetError())
        }, 5000);
    }
}

//signup
export const signUp = async ( dispatch, user) => {
    
    dispatch(Start())
    try {
        console.log(user)
        const res = await publicRequest.post("api/auth/register", user)
        
        console.log("res : " + res.data)
        dispatch(signUpSucces(res.data))
    } catch (error) {  
        dispatch(signupFailed(error.response.data));

        //reseting error
        setTimeout(() => {
            dispatch(resetError())
        }, 5000);
    }
}
