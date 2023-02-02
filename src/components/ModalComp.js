import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    max-width: 90%;
    height: max-content;
    background-color: white;
    box-shadow: 0 0px 0px 1000px rgba(0,0,0,.3);
    padding: 20px;
    z-index: 100;
    border-radius: 1vmax;
    display: ${p => p.isOpen ? "block": "none"};
`

function ModalComp({children, isOpen, }) { 
  return (
    <Container isOpen={isOpen}>
        {children}
    </Container>
  )
}

export default ModalComp