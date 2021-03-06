import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
//import { ShoppingCartOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../Responsive'
import { useSelector } from "react-redux";
import { useDispatch} from 'react-redux'
import { logoutUser } from '../redux/userRedux'



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
    padding: 10px 20px;
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
const Lenguage = styled.span`
    font-size: 14px;
    cursor: pointer;
    
`
const SearchContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 5px;
    
`
const Input = styled.input`
    outline: none;
    border: none;
    background-color: rgba(255,255,255,.8);
    
    
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

const MenueItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
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
      const cartProductss = useSelector(state => state.cart.quantity)
      const user = useSelector(state => state.user.currentUser);
      console.log(`user : ${user}`)
  return (
    <Container>
        <Wrapper>
            <Left>
                <Lenguage>EN</Lenguage>
                <SearchContainer>
                    <Input></Input><Search style={{colour: "grey", fontSize: 16, cursor: "pointer" }}/>  
                </SearchContainer>
            </Left>
            <Center>
                <Logo><Link onClick={HandleClick} style={link} to="/">Title.</Link></Logo>
            </Center>
            <Right>
                {!user ? <><MenueItem><Link style={link} to="/signup">Sing Up</Link></MenueItem>
                        <MenueItem><Link style={link} to="/login">Log In</Link></MenueItem></> :
                        <MenueItem onClick={handleLogout}>log out</MenueItem> }
                         
                        
                <MenueItem>
                    {user && <Badge badgeContent={cartProductss} color="primary">
                        <Link style={link} to="/cart"><ShoppingCartOutlined/></Link>
                    </Badge>}
                </MenueItem>
            </Right>
            
        </Wrapper>    
    </Container>
  )
}

export default Navbar