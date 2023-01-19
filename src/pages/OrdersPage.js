import React from 'react'
import Announcments from '../components/Announcments'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import styled from 'styled-components'
import SingleOrderSection from '../components/SingleOrderSection'

const Container = styled.div`
    width: 100%;
    background-color: #e0dede;
    padding: 20px 0px;
`
const TopSection = styled.div`
    display: flex;
    margin-bottom: 20px;

`
const Title = styled.h1`

`
const Desc = styled.span`

`

const BottomSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`


function OrdersPage() {
  return (
    <>
        <Announcments/>
        <Navbar/>
        <Container>
            <div className="container">
                <TopSection>
                    <Title>Your Orders</Title>
                </TopSection>
                <BottomSection>
                    <SingleOrderSection/>
                    <SingleOrderSection/>
                </BottomSection>
            </div>
        </Container>
        <NewsLetter/>
        <Footer/>
    </>
  )
}

export default OrdersPage