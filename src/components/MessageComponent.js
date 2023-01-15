import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearError } from '../redux/errorRedux'

const Container = styled.div`
    display: ${(props) => props.value};
    transition: all 0.5s ease-in-out;  
    position: sticky;
    bottom: 0;
    
    
`
const Wrapper = styled.div`  
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 50px;
    background-color: #353536;
    display: flex;
    align-items: center;
`
const Success = styled.div`
    margin-left: 15px;
    font-weight: 500;
    color: white;
`
function MessageComponent() {
    const dispatch = useDispatch()

    const id = useSelector(r => r.error.id)
    const message = useSelector(r => r.error.error)
    const [isShow, setisShow] = useState("block")

    
    
    useEffect(() => { 
        if(message && id) {
            setisShow("block")
            const timeout = setTimeout(() => {
                dispatch(clearError())
                setisShow("none")
                console.log("hiding error")
            }, 5000)
            return () => {
                clearTimeout(timeout);
            }
        }
    
    }, [message, id])
    
  return (
    <>
        {message && id && <Container value={isShow}>
            <Wrapper>
                <Success>{message}</Success>
            </Wrapper>
        </Container>}
    </>
  )
}

export default MessageComponent