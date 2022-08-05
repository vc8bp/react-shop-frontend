import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { publicRequest } from "../axiosReqMethods"
import ErrorComponent from "../components/ErrorComponent"
import { mobile } from "../Responsive"
import Navbar from "../components/Navbar"
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 60px); //60px of navbar
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
    background-image: linear-gradient(
      rgba(255,255,255, 0.5),
      rgba(255,255,255, 0.5)
      ),
      url("https://images.pexels.com/photos/131634/pexels-photo-131634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
`
const Wrapper = styled.div`
    padding: 30px 40px;
    width: min(300px, 80%);
    background-color: white;
    flex-direction: row;
    position: relative;
    align-items: center;
    border-radius: 1vmax;
    box-shadow: 20px 20px 50px grey;
    ${mobile({
        padding: "15px 20px",
    })}
`

const Form = styled.form`
   margin-bottom: 40px;
`
const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    
`
const P = styled.p`
text-align: center;
    max-width: 90%;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 30px;
    margin-left: 13px;
    font-weight: 400;
`
const Input = styled.input`
    
    padding: 5px;
    width: min(290px, 95%);
    margin-bottom: 15px;
    font-size: 1rem;
    border-radius: 0.5vmax;
    
`
const Button = styled.button`
    padding: 5px;
    width: min(300px, 100%);
    margin-bottom: 10px;
    border-radius: 0.5vmax;
    background-color: teal;
    color: white;
    border: none;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        background-color: #9af5f5;
    }
    

`


const Button2 = styled.button`
    text-align: center;
    position: absolute;
    width: min(480px, 100%);
    //height: 20px;
    padding: 15px 0px;
    left: 0px;
    cursor: pointer;
    border: none;
    //box-shadow: 20px 20px 50px grey;
    border-radius: 0vmax 0vmax 1vmax 1vmax;
`
const ForgotPassword = () => {

    const [message, setmessage] = useState(null)
    const [uid, setuid] = useState(null)

    const navigate = useNavigate();
    const [email, setEmail] = useState(null)
    

    const handleSubmit = async (e)  => {
        setuid(uuidv4());
        e.preventDefault();
        try {   
            const data = await publicRequest.post("/api/auth/forgotpass", {email})

            //checking if req was success
            data.status === 200 && setmessage(data.data)
        
        } catch (error) {
            
            setmessage(error?.response?.data?.error)
        } 
    }
  return (
    <>
    <Navbar/>
    <Container>
        <Wrapper> 
            <Title>Trouble Logging In?</Title>
            <P>Enter your email and we'll send you a link to reset your account password.</P>
                <Form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></Input>
                    <Button disabled={!email}>Send reset link</Button>
                </Form>
                <Button2 onClick={() => navigate("/login")}>Back To Login</Button2>
        </Wrapper>



    </Container>
    {/* sending date because it will not run use effect if the message is same but you again wont to show
        and date is always unique so use effect will */}
    <ErrorComponent message={message} id={uid} />
    </>
  )
}

export default ForgotPassword