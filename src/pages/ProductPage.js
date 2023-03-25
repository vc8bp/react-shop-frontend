import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Announcments from '../components/Announcments'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import { mobile } from '../Responsive'
import { useLocation, useNavigate } from 'react-router-dom'
import {publicRequest, userRequest} from '../axiosReqMethods'
import { addProduct} from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import addDynamicScript from '../helpers/addDynamicScript'
import { useRef } from 'react'
import Loading from '../components/Loading'
import axios from 'axios'
import ReviewComp from '../components/ReviewComp'
import WriteaReview from '../components/WriteaReview'
import { setError } from '../redux/errorRedux'
import GetUserAddress from '../components/GetUserAddress'
import { setAddress } from '../redux/userRedux'




const Wrapper = styled.div`
    display: flex;
    padding: 20px; 
    
    ${mobile({
        flexDirection: "column",
        padding: "20px 10px"
    })}

`

//IMG N INFO
const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    
`
const Image = styled.img`
    max-width: 100%;
    max-height: 80vh;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease-in-out;
    
     // so many for browser supports for imageDragable: false
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    // so many for browser supports for zoom cursor
    cursor: -moz-zoom-in; 
    cursor: -webkit-zoom-in; 
    cursor: zoom-in;

    :hover {
        transform: scale(1.1);
    }
`
const InfoContainer = styled.div`
    padding: 0px 20px;
    flex: 1;

    ${mobile({
        padding: "0px 0px",
    })}
    
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
    margin: 10px 0px;
 `
const Stock = styled.span`
    font-size: 1.5rem;
    color: ${p => p.inStock ? "green" : "red" };
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
    background-color: ${props=> props.color};
    border-radius: 50%;
    box-sizing: border-box;
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
    @media only screen and (max-width: 1330px) {
        width: 100%;
    }
    
`
const PurchaeContainer = styled.div`

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
    margin: 5px 5px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #c3c7c4;
    }
    @media only screen and (max-width: 1330px) {
        margin: 5px 10px;
    }
    &:disabled {
        background-color: #ebebeb;
        cursor: not-allowed;
    }
    
`






function ProductPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [product, setProduct] = useState(null)
    const [ProductQuentity, setProductQuentity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    //const [error, setError] = useState(null)
    //setting defalut size and color for product
    const [Color, setColor] = useState((product?.color?.length >= 0 && `#${product.color[0]}`));
    const [size, setsize] = useState((product?.size?.length >= 0 && product.size[0]));

    //reviews mdodal
    const [modalisOpen, setmodalIsOpen] = useState(false)

    //get use address modal
    const [addmodalisOpen, setaddmodalIsOpen] = useState(false)
    
    //to change title as soon as component mounts
    useEffect(() => {
        document.title = `SatnamCreation - ${props.title}`
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    //axios req used to cancel prev request
    const ourRequest = axios.CancelToken.source()

    //fetching product info
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    useEffect(() => {
      const gatData = async () => {
        setIsLoading(true)
        try {
            const data = await publicRequest.get(`/api/products/info/${id}`, {cancelToken: ourRequest.token});
            setProduct(data.data);
            setIsLoading(false)  
            
        } catch (error) {
            if (error.response.status === 404) navigate("/")
            dispatch(setError(error.response.data.message))
            setIsLoading(false)  
        }     
      }
      gatData()

      return () => {
        ourRequest.cancel()
        setProduct({})
        setProductQuentity(1)
      }
    }, [id])
   
    const HandlClick = (type) => {   
        if(type === "dec") setProductQuentity((prev) => ProductQuentity > 1 ? prev -1: prev)
        if(type === "inc") setProductQuentity((prev) => ProductQuentity < product.quantity ? prev +1: prev);
    } 


    //add to cart   
    const user = useSelector(state => state.user.currentUser);   

    const handleSubClick = async () => { 
        if(!user) {
            return navigate("/login")
        }
        try {
            const res = await userRequest.post(`/api/cart`,{
                products : [
                    {
                        productID: product._id,
                        quantity: ProductQuentity,
                        color: Color || product.color[0],
                        size : size || product.size[0]
                    }
                ]
            }) 
            !res.data.productExisted && dispatch(addProduct()) 
            dispatch(setError(res?.data?.message))
        } catch (error) {
            console.log(error)
            dispatch(setError(error.response?.data?.message))
        }
    }


    const userAddress = useSelector(state => state.user.address)   

    const handleBuyNow = async () => {
        if(!user) {
            return navigate('/login');
        } 

        // if there is address then continue or set get address popup
        if(!userAddress){  //if address is not stored in users local storage then get from db
            try {
                const {data} = await userRequest.get("/api/user/address")
                if(!data.ok){
                    return setaddmodalIsOpen(true);
                }
                dispatch(setAddress(data.address))  //setting address wh to redux       
            } catch (error) {
                return setaddmodalIsOpen(true)
            }
        }
        
        if(!window.Razorpay) {
            await addDynamicScript("https://checkout.razorpay.com/v1/checkout.js") //script is not loading at first time dk why so i added this XD
        } 

        let Dborder, Dbkey;
        try {
            const {data:{order}} = await userRequest.post("api/buy/checkout",{
                user:user._id,
                product: {
                    productID: product._id,
                    quantity:ProductQuentity,
                    size, 
                    color:Color,
                },
                type: "product",
                userInfo: {
                    address: userAddress,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    number: user.number
                }
            });
            Dborder = order;

            const {data:{key}} = await userRequest.get("api/buy/getkey");
            Dbkey = key;

        } catch (error) {
            dispatch(setError(error?.response?.data?.message || "error accured while creating order"))
        }
        
        const options = {
            key: Dbkey, //reciving key from backend sue to security 
            amount: Dborder.amount, 
            currency: "INR",
            name: product.title,
            description : `${product.desc.slice(0, 252)}...` || "random description", //slicing it because razor pay dosent allow desc length more then 255
            image: product.img,
            order_id: Dborder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:4000/api/buy/paymentVerify",
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: user.number
            },
            notes: {
                address: "Dummy Office address"
            },
            theme: {
                color: "#40a0a0"
            }
        };      
        const rzp1 = new window.Razorpay(options);
        rzp1.open();       
    }

 
    // IMAGE Lence In Out Effect
    const img = useRef(null)
    const handleImgMouseEnter = (e) =>{
        const x = e.clientX - e.target.offsetLeft
        const y = e.clientY - e.target.offsetTop
        img.current.style.transformOrigin = `${x}px ${y}px`
        img.current.style.transform = 'scale(2)'   
    }

    const hadleImgMouseLeave = (e) => {
        img.current.style.transformOrigion = `center`
        img.current.style.transform = 'scale(1)'
    }
  
  return ( 
    <>
      <Announcments/>
      <Navbar/>
        {
            isLoading ? <Loading/> :            
            product && 
            <>
            <Wrapper>    
            <ImgContainer>
              <Image src={product.img} onMouseMove={handleImgMouseEnter} ref={img} onMouseLeave={hadleImgMouseLeave}/>
            </ImgContainer>
            <InfoContainer>
                <TitleContainer>
                  <Title>{product.title}</Title>
                  <Dno>Design No - {product.productno}</Dno>
                </TitleContainer>
                <Description>{!product.desc ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sint accusamus explicabo in natus dolor maiores voluptate labore adipisci!lorem20Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta, commodi pariatur nisi fugiat hic quia voluptas! Quidem, earum voluptas.`: product.desc}
                </Description>
                <Price>₹{product.price}</Price>
                {product.quantity <= 5 && <Stock inStock={product.quantity >= 1}>{product.quantity >= 1 ? `Only ${product.quantity} left in stock` : "Currently unavailable"}</Stock>}
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {(product.color || []).map((e)=> (
                          <FilterColor color={e} key={e} onClick={()=> setColor(e)}/>
                        ))}
                    </Filter>
                    <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={(e)=> setsize(e.target.value)} >
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
                        <PurchaeContainer>
                          <Button onClick={handleSubClick} disabled={product.quantity < 1}>Add To Cart</Button>
                          <Button onClick={handleBuyNow} disabled={product.quantity < 1}>Buy Now</Button>
                        </PurchaeContainer>
                      </CartContainer>
            </InfoContainer>
  
        </Wrapper> 
        <WriteaReview product={product} setModal={setmodalIsOpen} isOpen={modalisOpen} />
        <GetUserAddress setModal={setaddmodalIsOpen} isOpen={addmodalisOpen} />
        <ReviewComp productID={product._id} productName={product.title} rating={product.ratingsAverage} ratingCount={product.ratingsQuantity} setModal={setmodalIsOpen}/>
        </>
        }
      <NewsLetter/>
      <Footer/>
      
    </>
  )
}

export default ProductPage