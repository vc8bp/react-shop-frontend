
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NewsLetter from '../components/NewsLetter';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
`;
const Wrapper = styled.div`
  box-sizing: border-box;
    padding: 3rem 0;
    width: 1200px;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const MainSection = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  >*{
    width: max-content;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #777;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  max-width: 100%;

  >form {
    width: 100%;

    >p {
      margin-top: 0.5rem;
    }
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;
const FakeInput = styled.div`
box-sizing: border-box;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #777;
  }
`;

const AddressContainer = styled.div`
  width: 500px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
`
const AddressMain = styled.div`

`
const Edit = styled.p`
  text-decoration: underline;
  cursor: pointer;
`

const navMap = {
  1: "Account Details",
  2: "Delivery Addresses"
}


const UserSettings = () => {
  const [isActivated, setIsActivated] = useState(1)
  const user = useSelector(s => s.user.currentUser);
  const {firstName, lastName, email, number} = user;

  const [userDataForm, setUserDataForm] = useState({firstName, lastName, email, number})

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDataForm(p => ({...p, [name]: value}))
  }

  // useEffect(() => {
  //   (async () => {
  //     const userAddress = useSelector(state => state.user.address)   
  //     if(!userAddress){  //if address is not stored in users local storage then get from db
  //         try {
  //             const {data} = await req.get("/api/user/address")
  //             console.log(data)
  //             if(!data.ok){
  //                 return setaddmodalIsOpen(true);
  //             }
  //             dispatch(setAddress(data.address))  //setting address wh to redux       
  //         } catch (error) {
  //             return setaddmodalIsOpen(true)
  //         }
  //     }
  //   })()
  // }, [])
  
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Settings</Title>
          <MainSection>
          <Navigation>
            <NavLink onClick={() => setIsActivated(1)}>Account Details</NavLink>
            <NavLink onClick={() => setIsActivated(2)}>Delivery Addresses</NavLink>
          </Navigation>
          <Content>
            <Title>{navMap[isActivated]}</Title>
            {isActivated === 1 &&
                        <form>
                        <p>First name</p>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={userDataForm.firstName}
                          onChange={handleInputChange}
                        />
                        <p>Last name</p>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={userDataForm.lastName}
                          onChange={handleInputChange}
                        />
                        <p>Email address</p>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={userDataForm.email}
                          onChange={handleInputChange}
                        />
                        <p>Number</p>
                        <Input
                          type="tel"
                          name="number"
                          placeholder="Phone number"
                          value={userDataForm.number}
                          onChange={handleInputChange}
                        />
                        <p>Password</p>
                        <FakeInput>************* <Edit>Edit</Edit></FakeInput>
                        <Button type="submit">Save Changes</Button>
                      </form>
              }
            {isActivated === 2 && 
            <AddressContainer>
              <AddressMain>
                <p>Default Delivery Address</p>
                <p>vivek chaturvedi</p>
                <p>dahisar, sdfsdf, mumbai</p>
                <p>mumbai, 400068</p>
              </AddressMain>
              <Edit>Edit</Edit>
            </AddressContainer>
            }
          </Content>
          </MainSection>
        </Wrapper>
      </Container>
      <NewsLetter />
      <Footer />
    </>
  );
}
export default UserSettings;
