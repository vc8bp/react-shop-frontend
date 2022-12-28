import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
//import { ShoppingCartOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {mobile} from '../Responsive'
import { useSelector } from "react-redux";
import { useDispatch} from 'react-redux'
import { logoutUser } from '../redux/userRedux'
import { userRequest } from "../axiosReqMethods";
import { setProduct } from "../redux/cartRedux";



const link = {
    color: "black",
    textDecoration: "none",
}


const Container = styled.div`
    max-height: 60px;
    box-shadow: 0 3px 2px -1px rgba(0,0,0,.1);

    //sticky navbar
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: rgba(255,255,255,.8);
    
    
    
`
const Wrapper = styled.div`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${mobile({
        display: "none",
    })}
`


const SearchContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    padding: 5px;
    border-radius: 0.5vmin;
    height: 25px;
    
`
const Input = styled.input`
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
    
    
    
`

const Center = styled.div`
    flex: 1;
`
const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    
    ${mobile({
        textAlign: "start",
        fontSize: "1.5rem",
    })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

`

const DropdownList = styled.div`
    display: none;
  //  position: relative;
    
`
const DropdownContainer = styled.div`
    background-color: #baabab;
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
`
const Dropdown = styled.span`
    padding: 10px 20px;
    background-color: inherit;
    color: black;
    &:hover {
        background-color: #e3dbdb;
        color: black;
    }
`
const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover ${DropdownList}{
        display: block;
    }
`
const Hello = styled.span`
    font-size: 15px;
    font-weight: 400;
`
const Account = styled.span`
    font-weight: 600;
    position: relative;
`



const MenueItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    padding: 10px 0;
    ${mobile({
        marginLeft: "0.6rem",
    })}
`

function Navbar() {


    const HandleClick = () => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    const dispatch = useDispatch()
    const handleLogout = () => {       
        dispatch(logoutUser())
    }

      //const cartQuantity = useSelector(state => state.cart.quantity)
    //   const cartProductss = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser);
    const cartSize = useSelector(state => state.cart.quantity)
    console.log(cartSize)

    useEffect(() => {
        const fetchh = async () => {
            const {data} = await userRequest.get("api/cart/size")
            dispatch(setProduct(data.size))
        }
        fetchh();

    }, [])
    
  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo><Link onClick={HandleClick} style={link} to="/">Title.</Link></Logo>
            </Left>
            <Center>
            <SearchContainer>
                    <Input></Input><Search style={{colour: "grey", fontSize: 16, cursor: "pointer" }}/>  
                </SearchContainer>
            </Center>
            <Right>
                {!user ? <><MenueItem><Link style={link} to="/signup">Sing Up</Link></MenueItem>
                        <MenueItem><Link style={link} to="/login">Log In</Link></MenueItem></> 
                        :
                        <AccountContainer>
                        <Hello>hello, {user.firstName}</Hello>
                        <Account>Account</Account>
                            <DropdownList>
                                <DropdownContainer>
                                    <Dropdown>Setting</Dropdown>
                                    <Dropdown>Orders</Dropdown>
                                    <Dropdown onClick={handleLogout}>Logout</Dropdown>
                                </DropdownContainer>
                            </DropdownList>
                        </AccountContainer>
                        }
                         
                        
                <MenueItem>
                    {user && <Badge badgeContent={cartSize} color="primary">
                        <Link style={link} to="/cart"><ShoppingCartOutlined/></Link>
                    </Badge>}
                </MenueItem>
            </Right>
            
        </Wrapper>    
    </Container>
  )
}

export default Navbar