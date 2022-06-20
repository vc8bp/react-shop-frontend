import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { publicRequest } from "../axiosReqMethods"
import ErrorComponent from "../components/ErrorComponent"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
`
const Wrapper = styled.div`
    padding: 30px 40px;
    width: min(300px, 90%);
    background-color: white;
    flex-direction: row;
    position: relative;
    border-radius: 1vmax;
    box-shadow: 20px 20px 50px grey;
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
    width: min(290px, 100%);
    margin-bottom: 15px;
    font-size: 1rem;
    
`
const Button = styled.button`
    padding: 5px;
    width: min(304px, 100%);
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
    width: min(385px, 100%);
    //height: 20px;
    padding: 15px 0px;
    left: 0px;
    cursor: pointer;
    border: none;
    //box-shadow: 20px 20px 50px grey;
    border-radius: 0vmax 0vmax 1vmax 1vmax;
`
const ResetPassword = () => {

    const [message, setmessage] = useState(null)
    const [date, setdate] = useState(null)

    const navigate = useNavigate();
    const [password, setpassword] = useState(null)
    const [cpassword, setCpassword] = useState(null)
    console.log(password)


    const location = useLocation();
    const id = location.pathname.split("/")[2];
    console.log(id)


    const handleSubmit = async (e)  => {
        e.preventDefault();
        setdate(Date.now());

        if(password !== cpassword) {
            setmessage("Passwords do not match")
            setCpassword("");
            setpassword("");
            return
        }
        
        try {   
            const data = await publicRequest.post(`/api/auth/resetpassword/${id}`, {password})

            //checking if req was success
            data.status === 200 && setmessage(data.data)
        
        } catch (error) {
            setmessage(error?.response?.data?.error)
        } 
    }
  return (
    <>
    <Container>
        <Wrapper> 
            <Title>Trouble Logging In?</Title>
            <P>Enter your password and we'll send you a link to reset your account password.</P>
                <Form onSubmit={handleSubmit}>

                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}></Input>
                    <Input type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)}></Input>


                    <Button disabled={!password || !cpassword}>Change Password</Button>
                </Form>
                <Button2 onClick={() => navigate("/login")}>Back To Login</Button2>
        </Wrapper>



    </Container>
    {/* sending date because it will not run use effect if the message is same but you again wont to show
        and date is always unique so use effect will */}
    <ErrorComponent message={message} date={date} />
    </>
  )
}

export default ResetPassword