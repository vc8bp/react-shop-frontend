import styled, { keyframes } from 'styled-components'
import React from 'react'
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
    transform: translateX(100%);
    left: 0%;
  }

  100% {
    transform: translateX(-200%);
    left: 100%;
  }
`
const Text = styled.p`
  position: absolute;
  font-size: clamp(0.8rem, 2.5vw, 1.4rem); 
  width: max-content;
  
  animation: 10s linear 0s infinite ${slide};
  /* @media (max-width: 500px) {
    font-size: 10px;
  } */
`



function Announcments() {
  return (
    <Container>
        <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum commodi est maxime odio atque voluptates sapiente, voluptatem neque deleniti? Minus!
        </Text>
        
    </Container>
  )
}

export default Announcments