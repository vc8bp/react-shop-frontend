import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    display: ${(props) => props.value};
    transition: all 0.5s ease-in-out;

    position: sticky;
    bottom: 0;
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
            
            const inter = () => {
                setTimeout(() => {
                    setmessage(null);
                    setisShow("none");
                    console.log("hiding error")
                }, 5000)
            }
            clearInterval(inter, ()=> console.log("i am clear interval"))
            setmessage(props.message);
            inter()
            setisShow("block");
               
                
        

    }, [props.message, props.id])
    
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