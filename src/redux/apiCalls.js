import { Start, loginSucces, Failed, signUpSucces, signupFailed  } from './userRedux';
import { publicRequest } from '../axiosReqMethods';
//login
export const login = async ( dispatch, user ) => {
    
    dispatch(Start())
    try {
        const res = await publicRequest.post("api/auth/login", user)
        console.log(user)
        dispatch(loginSucces(res.data))
    
    } catch (error) {
        dispatch(Failed(error.response.data))
    }
}

//signup
export const signUp = async ( dispatch, user) => {
    
    dispatch(Start())
    try {
        const res = await publicRequest.post("api/auth/register", user)
        console.log("res : " + res.data)
        dispatch(signUpSucces(res.data))
    } catch (error) {
        
        dispatch(signupFailed(error.response.data))
    }
}
