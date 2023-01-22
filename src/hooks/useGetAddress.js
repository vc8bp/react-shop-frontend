// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { userRequest } from "../axiosReqMethods"
// import { setAddress } from "../redux/userRedux"

// const useGetAddress = () => {
//     const address = useSelector(state => state.user.address)   

//     const dispatch = useDispatch()

//     useEffect((setaddmodalIsOpen) => {
//         (async () => {
//             // if there is address then continue or set get address popup
//             console.log({address})
//             if(!address){  //if address is not stored in users local storage then get from db
//                 try {
//                     const {data} = await userRequest.get("/api/user/address")
//                     console.log(data)
//                     if(!data.ok){
//                         return setaddmodalIsOpen(true);
//                     }
//                     dispatch(setAddress(data.address))  //setting address wh to redux       
//                 } catch (error) {
//                     return setaddmodalIsOpen(true)
//                 }
//             }
//         })()
//     }, [])
    
//     return {address}
// }

// export default useGetAddress