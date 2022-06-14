import { ArrowBackOutlined, ArrowForwardOutlined } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { SliderItems } from '../DummyData'
import {mobile} from '../Responsive'

const Container = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
        display: "none",
    })} 
    
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f2dcda;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px"};
    right:  ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease-out;
    transform: translateX(${props => props.slideIndex * -100}vw);
    
`
const Slide = styled.div`
    
    width: 100vw;
    height: fit-content;
    display: flex;
    align-items: center;
    background-color: #${props=> props.bg};
    
    
        
    
`
const ImgContainer = styled.div`
    min-width: 400px;
    height: 100%;
    flex: 1;

`
const Image = styled.img`
    margin: 10px 0px;
    margin-left: 10px;
    width: 100%;
    border-radius: 5%;
    //height: 80%;
    
`
const InfoContainer = styled.div`
    padding:  50px;
    flex: 1;
    
`
const Title = styled.h1`
    font-size: min(5vw, 4.3rem);
`
const Des = styled.p`
    margin: 50px 0px;
    font-size: min(2vw,1.25rem);
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`
function Slider() {

    let [slideIndex, setSlideIndex] = useState(0);

    const HandleLeftClick = () => {
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : SliderItems.length-1);
         }

    const HandleRightClick = () => {
         setSlideIndex(slideIndex < SliderItems.length-1 ? slideIndex+1 : 0);
         }

  return (
    <Container>
        <Arrow direction = "left" onClick={HandleLeftClick}>
            <ArrowBackOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex} >
            {SliderItems.map((item) => (
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.Title}</Title>
                        <Des>{item.des}</Des>
                        <Button>Read More</Button>
                    </InfoContainer>
                </Slide>
            ))}
               
        </Wrapper>
        <Arrow direction = "right" onClick={HandleRightClick} >
            <ArrowForwardOutlined />   
        </Arrow>
    </Container>
  )
}

export default Slider