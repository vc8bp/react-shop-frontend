import styled from 'styled-components'
import React from 'react'
const Container = styled.div`
    min-height: 40px;
    //height: 4vh;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

const Text = styled.p`
  font-size: clamp(0.8rem, 2.5vw, 1.4rem); 
  /* @media (max-width: 500px) {
    font-size: 10px;
  } */
`


function Announcments() {
  return (
    <Container>
        <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, velit.
        </Text>
        
    </Container>
  )
}

export default Announcments