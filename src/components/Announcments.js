import styled, { keyframes } from 'styled-components'
import React, {useState, useEffect} from 'react'
import { publicRequest } from '../axiosReqMethods'

const Container = styled.div`
    min-height: 40px;
    //height: 4vh;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    
`
const slide = keyframes`

  0% {
    transform: translateX(100vw);
    @media (min-width: 700px) {
      transform: translateX(-100%);
    } 
  }

  100% {
    transform: translateX(-100vw); //tryed some random min max stuff and it worked!!
    /* transform: translateX(-200%); */
    
    /* @media (max-width: 700px) {
      transform: translateX(-100%);
    } */
  }

  
`
const Text = styled.p`
  position: absolute;
  font-size: clamp(0.8rem, 2.5vw, 1.4rem); 
  width: max-content;
  
  animation: 10s linear 0s infinite ${slide};
  
`



function Announcments() {
  const [announcment, setannouncment] = useState("")
  useEffect( async () => {
    const data = await publicRequest.get(`/api/announcment`);
    setannouncment(data.data);

  }, [])
  
  return (
  
    <>
      {announcment && <Container>
        <Text>
          {announcment.title}
        </Text>
      </Container>}
    </>
    
  )
}

export default Announcments