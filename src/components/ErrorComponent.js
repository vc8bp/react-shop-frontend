import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    display: ${(props) => props.value};
    transition: all 0.5s ease-in-out;
`
const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 50px;
    background-color: #353536;
    color:  black;
    display: flex;
    align-items: center;
    

`

const Success = styled.div`
    margin-left: 15px;
    font-weight: 500;
    color: white;
`
function ErrorComponent(props) {

    
    const [message, setmessage] = useState(null)
    const [isShow, setisShow] = useState("none")
    
    useEffect(() => {
        setmessage(props.message);
        setisShow("block");
     

        setTimeout(() => {
            setmessage(null);
            setisShow("none");
        }, 5000)

    }, [props.message, props.date])
    
    console.log(` show : ${isShow}`)
    console.log(message)
  return (
    <>
        {message &&<Container value={isShow}>
        <Wrapper>
        <Success>{message}</Success>
        </Wrapper>
        </Container>}
    </>
  )
}

export default ErrorComponent