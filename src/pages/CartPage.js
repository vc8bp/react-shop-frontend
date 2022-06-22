import React, { useEffect }from 'react'
import Announcments from '../components/Announcments'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from '../Responsive'
import  { useSelector } from 'react-redux'
import { publicRequest, userRequest } from '../axiosReqMethods'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux'



const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.div`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=> props.type ==="filled" && "none"};
    background-color: ${props=> props.type ==="filled" ? "Black" : "transparent"};
    color: ${props=> props.type ==="filled" && "white"};
    
`
const TopTexts = styled.div`
    ${mobile({
        display: "none",
    })} 
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    //flex-direction: column;
    ${mobile({
        flexDirection: "column",
    })} 
`
const Info = styled.div`
    flex: 3;

`



const Product = styled.div`
    flex: 2;
    display: flex;
    margin: 10px 0px;
    ${mobile({
        flexDirection: "column",  
    })} 
`
const ProductDeteail = styled.div`
    flex: 2;
    display: flex;
    ${mobile({
        flex: "1",
        width: "5vw",
    })} 
`
const Image = styled.img`
    width: 200px;

`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px;
    `
const ProductName = styled.span``
const ProductNumber = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #${props => props.color};
`
const ProductSize = styled.span``
const PriceDeteail =styled.div`    
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${mobile({
        marginTop: "1rem",
        
    })} 
    
`


const ProductAmmountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    
    
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

const ProductAmmount = styled.div`
    height: 30px;
    width: 30px; 
    border: solid 1px teal;
    padding :5px ;
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const ProductPrice = styled.span`
    margin: 20px 0px;
    font-weight: 600;
    font-size: 1.2rem;
    &:hover {
        transform: scale(1.1);
    }
`

const Hr = styled.hr`
    background-color: #eee;
    height: 1px;
    border: none;
`


const Summary = styled.div`
    flex: 1;
    max-height: 50vh;
    border: solid lightgray 1px;
    border-radius: 5%;
    padding: 10px;
`

const SummaryTitle = styled.h1`
    font-weight: 300;
    margin: 10px 0px;
`
const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
    font-weight: ${props=> props.type === "total" && 600};
    font-size: ${props=> props.type === "total" && 1.2}rem;
    margin: ${props=> props.type === "total" && 10}px 0px;
`
const SummaryText = styled.div`

`
const SummaryPrice = styled.div`
    
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button`
    background-color: black;
    color: white;
    border: none;
    padding: 20px;
    width: 80%;
    margin-top: 20px;
    ${mobile({
        width: "50%",
        borderRadius: "5%"  ,   
        
    })} 
    
    
`



    


function CartPage(props) {
    //to change title as soon as component mounts
    useEffect(() => {
        document.title = `SatnamCreation - ${props.title}`
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    //api calls
    // const userID = useSelector(state => state.user.currentUser._id);
    // console.log(`local = ${userID}`)
    // const dispatch = useDispatch();

    // useEffect( async () => {
    //     const cartProductRes = await userRequest.get(`/api/cart/info/${userID}`)
    //     cartProductRes.data.products.map(async (product)=>{
    //         const singleProducts = await publicRequest.get(`api/products/info/${cartProductRes.data.products.productID}`)
    //         console.log(singleProducts)
    //         dispatch(
    //             addProduct({product})  
    //         )
    //     })
    //     console.log(cartProductRes.data)
    // }, [])
    
    const cartProducts = useSelector(state => state.cart)

  return (
    <Container>
        <Announcments/>
        <Navbar/>
        <Wrapper>
            <Title>Cart</Title>
            <Top>
                <TopButton>Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping ba</TopText>
                    <TopText>Your Wishlist</TopText>
                </TopTexts>
                <TopButton type="filled">CheckOut Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cartProducts.products.map((product) => (
                        <Product>
                        <ProductDeteail>
                         <Image src={product.img}/>
                           <Details>
                                <ProductName><b>Product:</b> {product.title}</ProductName>
                                <ProductNumber><b>ID:</b> {product.productno}</ProductNumber>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>Size:</b>{product.size}</ProductSize>
                            </Details>
                        </ProductDeteail>
                        <PriceDeteail>
                            <ProductAmmountContainer>
                                <ValueARButton>
                                    <Remove/>
                                </ValueARButton>
                                <ProductAmmount>{product.quantity}</ProductAmmount>
                                <ValueARButton>
                                    <Add/>
                                </ValueARButton>
                                
                            </ProductAmmountContainer>
                            <ProductPrice>{product.price}</ProductPrice>
                        </PriceDeteail>
                    </Product>
                    ))}
                    <Hr/>
                </Info>
                <Summary>
                    <SummaryTitle>Products</SummaryTitle>
                        {cartProducts.products.map((product) => (
                            <SummaryItem>
                                <SummaryText>{product.title}</SummaryText>
                                <SummaryPrice>{product.price * product.quantity}</SummaryPrice>
                            </SummaryItem>
                        ))}
                        <SummaryItem type="total">
                            <SummaryText >Total</SummaryText>
                            <SummaryPrice>{cartProducts.price}</SummaryPrice>
                        </SummaryItem>
                        <ButtonWrapper>
                            <Button>Check out</Button>
                        </ButtonWrapper>    
                </Summary>
            </Bottom>
        </Wrapper>
        <NewsLetter/>
        <Footer/>
        
    </Container>
  )
}

export default CartPage