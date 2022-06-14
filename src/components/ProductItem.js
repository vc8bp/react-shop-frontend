import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  
`;

const Title = styled.h1`
    position: absolute;
    
    height: 100%;
    width: 100%;
    display: flex;
    right: 0;
    bottom: 0;
    color: black;
    font-weight: bold;
    z-index: 3;   
    transition: all 1.1s ease;
    margin-left: 10px;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  `
  const Image = styled.img`
  height: 75%;
  z-index: 2;
  transition: all 0.5s ease-in;
  `;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;
  border-radius: 3%;
  &:hover ${Info}{
    opacity: 1;
  }
  @media (max-width: 500px) {
     min-width: 150px;
     height: 230px;
     }
     &:hover ${Title}{
        opacity: 0;
     }
     &:hover ${Image}{
        transform: scale(1.1);
     }
     &:hover {
        box-shadow: 4px 4px 2px -1px rgba(0,0,0,.2);
    }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;



const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  color: black;
  
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
  &:active {
    background-color: #000;
    color: white !important;
  }
`;

const link = {
  
  textDecoration: "none",
}


function ProductItem(data) {



  const HandleClick = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      
    });
  }
 
  const { img, title, _id} = data.data;




  return (
    <Container>
      <Circle />
      <Image src={img} />
      <Title>{title}</Title>
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link style={link} onClick={HandleClick} to={`/product/${_id}`}><SearchOutlined/></Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  )
}

export default ProductItem