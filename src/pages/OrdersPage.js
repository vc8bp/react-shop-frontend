import React, { useEffect, useState } from 'react'
import Announcments from '../components/Announcments'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import styled from 'styled-components'
import SingleOrderSection from '../components/SingleOrderSection'
import { userRequest } from '../axiosReqMethods'
import { useSelector } from 'react-redux'
import ProductNotFound from '../components/ProductNotFound.js'


const Container = styled.div`
    width: 100%;
    background-color: ${p => p.isOrders ? " #e0dede" : "white"};
    padding: 20px 0px;
`
const TopSection = styled.div`
    display: flex;
    margin-bottom: 20px;

`
const Title = styled.h1`
    margin-left: 10px;
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
    const user = useSelector(state => state.user?.currentUser);
    const [orders, setOrders] = useState([])

    useEffect(() => {
      const fetchOrders = async () => {
        try {
            const {data} = await userRequest.get(`/api/orders/find/${user._id}`)
            setOrders(data)
            console.log(data)
        } catch (error) {
            setOrders([])
        }
      }
      fetchOrders()
    }, [])
    
  return (
    <>
        <Announcments/>
        <Navbar/>
        <Container isOrders={orders.length}>

            {!orders.length ? <ProductNotFound title="No Orders Found" desc="Sorry, it looks like you haven't placed any orders yet."/>  
                : <div className="container">
                    <TopSection>
                        <Title>Your Orders</Title>
                    </TopSection>
                    <BottomSection>
                        {orders.map(i => {
                                return <SingleOrderSection key={i._id} order={i}  />
                            })}
                    </BottomSection>
                </div>
            }
        </Container>
        <NewsLetter/>
        <Footer/>
    </>
  )
}

export default OrdersPage