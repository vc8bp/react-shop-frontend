import {KeyboardDoubleArrowUp, } from '@mui/icons-material'
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

//apply amooth scroll from newsmonky app
//value state is not changing

const Container = styled.div`
  scroll-behavior: smooth;
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: ${props => props.value && 'none'};
    z-index: 999;
    
`
const Icon = styled.div`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(2  );
    background-color: white;
    border-radius: 50%;
    border: 2px solid #000;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: white;
      background-color: #000;

    }
    
`

function BackToTopBTN() {

  const [value, setvalue] = useState(true)

  useEffect(() => {
    
    window.addEventListener('scroll', () => {
      if(Window.scrollY > 100) {
        setvalue(true);
        
      } else {
        setvalue(false)
      }
    })
  }, [value])
  
  const HandleClick = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  
  return (
    <>
      
      {/* {value && ( */}
        <Container value={value}>
          <Icon>
            <KeyboardDoubleArrowUp onClick={HandleClick}/>
          </Icon>  
        </Container>
       {/* )} */}
        
    
    </>
    
  )
}

export default BackToTopBTN