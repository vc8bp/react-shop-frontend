import styled from 'styled-components';
import React from 'react'
import {mobile} from '../Responsive'
import { Link } from 'react-router-dom';


const Image = styled.img`
        width: 100%;
        width: 400px;
        height: 350px;
        max-width: 100%;
        object-fit: cover;
        object-position: center;
        transition: all 0.3s ease-in-out;
        
        
`

    
    const Info = styled.div`
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
        
    `
    const Title = styled.h1`
        margin-bottom: 20px;
        color: white;

    
    `
    const Button = styled.button`
        border: none;
        padding: 10px;
        cursor: pointer;
        color: gray;
        font-weight: 300;
        transition: all 0.3s ease-in-out; 
        
    `

    const Container = styled.div`
        flex: 1;
        margin: 3px;
        width: 400px;
        max-width: 80%;
        object-fit: cover;
        margin: auto;

        //min-height: 300px;
        position: relative;
        overflow: hidden;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        ${mobile({
            Height: "30vh",
            maxWidth: "350px",
            minWidth: "200px",
            height: "fit-content",
        })} 

        :hover ${Image} {
            transform: scale(1.1)
        }

        &:hover ${Button}{
            background-color: white;
            color: black;
        }
    `


    const link = {
        color: "black",
        textDecoration: "none",
    }

function CategoryItems(item) {

    const HandleClick = () => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }

    const { title, img, cat } = item.item;
  return (
    <div>
        <Container>
            <Image src={img}/>
            <Info>
                <Title>{title}</Title>
                <Button><Link onClick={HandleClick} style={link} to={`/products/${cat}`}>Read More</Link></Button>
            </Info>
        </Container>
        
    </div>
  )
}

export default CategoryItems