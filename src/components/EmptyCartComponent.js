import React from 'react'
import styled from 'styled-components'
import CartSvg from '../assets/cart.svg'
import { useNavigate } from 'react-router-dom'

const Contaier = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 20px 10px;
    @media screen and (max-width: 600px){
        padding: 0px 0px;
    }
`
const Wrapper = styled.div`
    padding: 20px;
    width: 400px;
    max-width: 100%;
    background-color: white;
    border-radius: 1vmax;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const Image = styled.img`
    width: 100%;
`
const Heading = styled.h2`
    font-size: 30px;
    text-align: center;
`
const Desc = styled.span`
    font-size: 20px;
    font-weight: 400;
    width: 350px;
    max-width: 90%;
    text-align: center;
`
const Btn = styled.button`
    width: 200px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid teal;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 128, 128, 0.1);
    transition: all 0.3s ease-in-out;
    :hover {
        background-color: teal;
        color: white;
        box-shadow: 0 5px 15px rgba(0, 128, 128, 0.3);
    }
`

function EmptyCartComponent() {
    const navigate = useNavigate()
  return (
    <Contaier>
        <Wrapper>
            <Image src={CartSvg}></Image>
            <Heading>Your cart is empty</Heading>
            <Desc>Looks like you haven't added anything to cart yet</Desc>
            <Btn onClick={() => navigate('/')}>Go home</Btn>
        </Wrapper>
    </Contaier>
  )
}

export default EmptyCartComponent