import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Announcments from '../components/Announcments'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import { mobile } from '../Responsive'
import { useLocation } from 'react-router-dom'
import {publicRequest} from '../axiosReqMethods'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'



const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    ${mobile({
        flexDirection: "column",
    })}

`

//IMG N INFO
const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Image = styled.img`
    width: 100%;
    max-height: 80vh;
    object-fit: cover;
    object-position: center;
`
const InfoContainer = styled.div`
    padding: 0px 20px;
    flex: 1;
    
`

const TitleContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 80%;
    @media only screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: normal;
    }
`

const Title = styled.h1`
    font-weight: 200;
`
const Dno = styled.h1`
    font-weight: 200;
    @media only screen and (max-width: 1000px) {
        margin-top: 10px;
        font-size: 20px;
    }
`

const Description = styled.p`
    margin: 30px 0px;
    `
const Price = styled.p`
    font-size: 30px;
 `


//FILTERS
const FilterContainer = styled.div`
    margin-top: 30px;
    width: 50%;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 1000px) {
        width: 100%;
    }
    
    
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.div`
    font-size: 20px;
    font-weight: 200;
    margin-right: 10px;
    
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    background-color: #${props=> props.color};
    border-radius: 50%;
    cursor: pointer;
    margin-left: 5px;
    &:active{
        border: solid black 1px;
    }
    &:hover{
        transform: scale(1.1);
    }
`
const FilterSize = styled.select`
    margin-left: 5px;
`
const FilterSizeOption = styled.option`
    padding: 10px;
    
`
//CART

const CartContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 1000px) {
        width: 100%;
    }
    
`
const ValueContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    

    
`
const CartValue = styled.span`
    height: 30px;
    width: 30px; 
    border: solid 1px teal;
    padding :5px ;
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ValueARButton = styled.div`
    cursor: pointer;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
        transform:scale(1.1);
     }
`

const Button = styled.button`
    max-height: 40px;
    border-color: teal;
    padding: 10px;
    border-radius: 5%;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: #c3c7c4;
    }
`






function ProductPage(props) {

    
    //to change title as soon as component mounts
    useEffect(() => {
        document.title = `SatnamCreation - ${props.title}`
      }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const [ProductQuentity, setProductQuentity] = useState(1)
    const HandlClick = (type) => {
     
        
        if(type === "dec") setProductQuentity((prev) => ProductQuentity > 1 ? prev -1: prev)
        if(type === "inc") setProductQuentity((prev) => ProductQuentity < 100 ? prev +1: prev);
        } 


    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({})
    

    useEffect(() => {
      const gatData = async () => {
          const data = await publicRequest.get(`/api/products/info/${id}`);
          setProduct(data.data);
      }
      gatData()
    }, [id])
    
    const [Color, setColor] = useState("");
    const [size, setsize] = useState("");

    //redux action
    const dispatch = useDispatch()
    const handleSubClick = () => {
        dispatch(
            addProduct({...product ,size:size, color:Color, quantity:ProductQuentity, price: product.price })
            
        )
    }
    
    
  
  return (

    
      
    <>
      <Announcments/>
      <Navbar/>
      <Wrapper>
          <ImgContainer>
            <Image src={product.img}/>
          </ImgContainer>
          <InfoContainer>
              <TitleContainer>
                <Title>{product.title}</Title>
                <Dno>Design No - {product.productno}</Dno>
              </TitleContainer>
              <Description>{!product.desc ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sint accusamus explicabo in natus dolor maiores voluptate labore adipisci!lorem20Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta, commodi pariatur nisi fugiat hic quia voluptas! Quidem, earum voluptas.`: product.desc}
              </Description>
              <Price>₹{product.price}</Price>
              <FilterContainer>
                  <Filter>
                      <FilterTitle>Color</FilterTitle>
                      {(product.color || []).map((e)=> (
                        <FilterColor color={e} key={e} onClick={()=> setColor(e)}/>
                      ))}
                  </Filter>
                  <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(e)=> setsize(e.target.value)}>
                      {(product.size || []).map((e)=> (
                         <FilterSizeOption key={e}>{e}</FilterSizeOption>
                      ))}
                  </FilterSize>
                  </Filter>
              </FilterContainer>
                    <CartContainer>
                      <ValueContainer>
                        <ValueARButton>
                            <Remove onClick={()=>HandlClick("dec")}/>
                        </ValueARButton>
                        <CartValue>{ProductQuentity}</CartValue>
                        <ValueARButton>
                            <Add onClick={()=>HandlClick("inc")}/>
                        </ValueARButton>
                        
                      </ValueContainer>
                      <Button onClick={handleSubClick}>Add To Cart</Button>
                    </CartContainer>
          </InfoContainer>

      </Wrapper>
      <NewsLetter/>
      <Footer/>
      
    </>
  )
}

export default ProductPage