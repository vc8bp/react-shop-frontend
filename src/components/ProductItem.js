import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';


const Wrapper = styled.div`
  display: flex;
  position: relative; //becaus of retinsContainer
`
const Info = styled.div`
  padding: 10px; 

`;

const Title = styled.h3`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 2px;
  ${Info}:hover{
    display: none;
  }
`

const Description = styled.h4`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  padding-bottom: 5px;
`
const WishList = styled.button`
  width: 100%;
  margin: auto;
  margin-bottom: 5px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 1px #888888;
  display: none;  
  transition: all 0.3s ease-in-out;

  :hover {
    color: white;
    background-color: teal;
    border-radius: 0.5vmin;
    box-shadow: 0px 0px 3px #888888;
  }
  `

const WishlistWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const Price = styled.span`
  font-weight: 600;
`

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

//Rating
const RatingsContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  background-color: rgba(235,240,245, 0.9);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  padding: 0px 5px;
  border-radius: 5px;
`;
const Rating = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 2px;
`;
const RatingCount = styled.div`
  margin: 5px;
`;

const Container = styled.div`
  
  width: 210px;
  height: 360px;
  background-color: #fcfcfc;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  

  @media only screen and (min-width: 500px) {
    :hover{
      box-shadow: 0px 0px 15px #888888;
      transform: translateY(-5px);
    }

    :hover ${Title} {
      display: none;
    }
    :hover ${Description} {
      display: none;
    }
    :hover ${WishList}{
      display: block;
    }
  }

  @media only screen and (max-width: 500px) {
    width: 175px;
    max-width: 185px;
  }
`;


const link = {
  
  textDecoration: "none",
}


function ProductItem(data) {

  const { img, title, _id, desc, price, ratingsAverage, ratingsQuantity} = data.data;

  return (
    
      <Container>
        <Link style={link}  to={`/product/${_id}`}>
          <Wrapper>
            <Image src={img} /> 
            {ratingsQuantity ? 
              (<RatingsContainer>
                  <Rating>{ratingsAverage} <StarIcon style={{color: "teal", fontSize: "20px"}} /></Rating>
                  <div style={{borderLeft: "1px solid green", height: "15px"}}></div>
                  <RatingCount>
                    {ratingsQuantity}
                  </RatingCount>
              </RatingsContainer>)
            : null}
          </Wrapper>
        </Link>
        <Info>
          <Title>{title}</Title>
          {/* <Description>{desc?.length > 25 ? `${desc?.slice(0,24)}...` : desc}</Description> */}
          <Description>{desc ? desc : "No Description"}</Description>
          <WishList>
            <WishlistWrapper>
              <FavoriteBorderOutlined/>WISHLIST
            </WishlistWrapper>
          </WishList>
          <Price>Rs. {price}</Price>
        </Info>  
      </Container>
    
  )
}

export default ProductItem