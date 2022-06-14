import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { mobile } from '../Responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../redux/apiCalls'

//import { resetsignupError } from '../redux/userRedux'


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
    width: 40%;
    padding: 30px 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5%;
    ${mobile({
      minWidth: "80%",
    })}
    
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
 // width: 100%;
  display: flex;
  flex-wrap: wrap;
`


const Input = styled.input`
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
  flex: 1;
  display: flex;
  min-height: 40%;
  ${mobile({
    minWidth: "50%",
  })}
`


const Button = styled.button`
  margin: 15px 0px;
  //margin rifht used to make it take full width
  margin-right: 50%;
  min-width: 40%;
  border: none;
  background-color: teal;;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  border-radius: 5%;
  display: block;
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
  margin-bottom: 5px;
`
const FormValidationError = styled.p`
  color: red;
  width: 100%;
`

const signupSuccessDiv = styled.h1`
  color: green;
  justify-content: center;
  align-items: center;
`

function SingUp(props) {

  //to change title as soon as component mounts
  useEffect(() => {
    document.title = `SatnamCreation - ${props.title}`
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const initialValue = { firstName: "", lastName: "", email: "", number: "", password: "", confirmPassword: ""}
  const [formValues, setFormValues] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const  { name, value} = e.target;
    setFormValues({ ...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(handleValidate(formValues))
      setIsSubmit(true)
  }

  useEffect(() => {
    //console.log(formErrors)
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      signUp(dispatch, formValues);
    }
  }, [formErrors])
  

  const handleValidate = (values) => {
    
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.firstName) {
      error.firstName = "firstName is requires";
    } 
    if(!values.lastName) {
      error.lastName = "lastName is requires";
    } 
    if(!values.number) {
      error.number = "number is requires";
    } 
    if(!values.email) {
      error.email = "email is requires"; }
    // } else if(!regex.test(values.email)){
    //   error.email = "this is not valid email";
    // }
    if(!values.password) {
      error.password = "password is requires";
    } 
    if(!values.confirmPassword) {
      error.cpassword = "confirm password is requires";
    }
    console.log(error.firstName, error.lastName, error.email, error.password)
    return error;
  }
  // const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { isFetching, isSignupError, signupSuccess, error} = useSelector(state => state.user)

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   signUp(dispatch, {name, email, number, password})
  //   setTimeout(() => {
  //       navigate("/login")
  //   }, 3000);


  
  
  //   // setTimeout(()=> {
  //   //   dispatch(resetsignupError())
  //   // }, 5000)
  // }
  
  return (
    
    <>
    <Navbar/>
    <Container>
      {signupSuccess ? <signupSuccessDiv>Signup Successfull!</signupSuccessDiv> : 
      <Wrapper>
          <Title>Title</Title>
          <Form onSubmit={handleSubmit}>
            <Input name='firstName' placeholder='Name' onChange={handleOnChange}/>
            <FormValidationError>{formErrors.firstName}</FormValidationError>

            <Input name='lastName' placeholder='Last Name' onChange={handleOnChange}/>
            <FormValidationError>{formErrors.lastName}</FormValidationError>

            <Input name='number' type="number" placeholder='Phone Number' onChange={handleOnChange}/>
            <FormValidationError>{formErrors.number}</FormValidationError>

            <Input name='email' type="email" placeholder='Email' onChange={handleOnChange} />
            <FormValidationError>{formErrors.email}</FormValidationError>

            <Input name='password' type="password" placeholder='Password' onChange={handleOnChange}/><br/>
            <FormValidationError>{formErrors.password}</FormValidationError>

            <Input name='confirmPassword' type="password" placeholder='Conform Password' onChange={handleOnChange}/>
            <FormValidationError>{formErrors.cpassword}</FormValidationError>
            {/* to check all inputes are filled */}
            <Button  disabled={isFetching}>Sing Up</Button>
             
            
          </Form>
          {error && <Error>{error.error}</Error>}
        <HelpLink><Link to="/login">Already Have Account?</Link></HelpLink> 
      </Wrapper> }
    </Container>
    </> 
    
  )
  }

export default SingUp