import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { mobile } from '../Responsive'
import { Link } from 'react-router-dom'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
//import { resetError } from '../redux/userRedux'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      rgba(255,255,255, 0.5),
      rgba(255,255,255, 0.5)
      ),
      url("https://images.pexels.com/photos/131634/pexels-photo-131634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    
    
`
const Wrapper = styled.div`
    width: min(20% 80px 100px);
    padding: 40px 30px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5%;
    ${mobile({
      padding: "20px 15px"
    })}
    
    
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`
const Form = styled.form`
 // width: 100%;
  display: flex;
  flex-wrap: wrap;
`


const Input = styled.input`
  min-width: 80%;
  padding: 10px;
  margin: 15px 0;
  flex: 1;
  display: flex;
  min-height: 40%;
  ${mobile({
    margin: "15px 0px",
  })}
`


const Button = styled.button`
  margin: 10px 0px;
  width: 40%;
  border: none;
  background-color: teal;;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  border-radius: 1vmin;
  &:disabled{
    color: green;
    background-color: #e1e6ed;
    cursor: not-allowed;
  }
`
const HelpLink = styled.a`
    margin: 5px 0px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`


function Login(props) {

  //to change title as soon as component mounts
  useEffect(() => {
    document.title = `SatnamCreation - ${props.title}`
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, isError, currentUser} = useSelector(state => state.user)

  console.log(currentUser)
  const dispatch = useDispatch()

  

  const submit = async (e) => {
    
    e.preventDefault();

    //getting user api
    const res = await axios.get(`https://geolocation-db.com/json/${process.env.REACT_APP_GIOLOCATION_DB_API_KEY}`);
    const ip = res.data.IPv4;
    
    login( dispatch ,{ email , password, ip })

    // setTimeout(()=> {
    //   dispatch(resetError())
    // }, 4000)
  }

  return (
    <>
    <Navbar/>
    <Container>
        <Wrapper>
            <Title>Login</Title>
            <Form>
                <Input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}></Input>
                <Input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></Input>
                <Button onClick={submit} disabled={isFetching}>Login</Button>
            </Form>
            {isError && <Error>{isError.error}</Error>}
            
            
            <HelpLink><Link to="/forgotpassword">Do note remember your Password?</Link></HelpLink>
            <HelpLink><Link to="/signup">Create New Account</Link></HelpLink>
        </Wrapper>
    </Container>
  
    </>
  )
}

export default Login