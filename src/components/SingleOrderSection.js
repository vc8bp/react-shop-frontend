import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    background-color: white;
    width: 100%;
    padding: 20px 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    gap: 5px;
    flex-wrap: wrap;
`
const OrderID = styled.span`
    padding: 5px 10px;
    background-color: teal;
    color: white;
    border-radius: 1vmax;
`
const OrderPlacedTime = styled.span`
    
`
const Bottom = styled.div`
    margin: 10px 0;
    
`

const Product = styled.div`
    display: flex;
    align-items: center;
    height: 200px;
    margin: 10px;
`
const ProductInfo = styled.div`
    box-sizing: border-box;
    flex: 2;
    height: 100%;
    display: flex;
    padding: 5px;
    gap: 10px;
`
const Image = styled.img`
    flex: 1;
    border-radius: 5px;
`
const PInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0px;
    flex: 2;

`
const ProductTitle = styled.h3``
const PmicroInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const Qty = styled.div`
`
const Size = styled.div`
`
const Price = styled.div`
    font-weight: 600;
    font-size: 20px;
`

const Statuss = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: left;
`
const StatusKey = styled.span`

`
const Statusvalue = styled.span`
    font-size: 25px;
    font-weight: 600;
    color: teal;
`
const DeliveryKey = styled.span`
`
const DeliveryValue = styled.span`
    font-size: 25px;
    font-weight: 600;
`




function SingleOrderSection() {
  return (
    <Container>
        <Top>
            <OrderID>Order #43534534875</OrderID>
            <OrderPlacedTime>Order placed: 7th jan 2002</OrderPlacedTime>
        </Top>
        <hr/>
        <Bottom>
            <Product>
                <ProductInfo>
                    <Image src='https://5.imimg.com/data5/IB/YL/MY-552852/men-slim-fit-shirt-500x500.jpg'/>
                    <PInfo>
                        <ProductTitle>Men's Slim Fit T-Shirt</ProductTitle>
                        <PmicroInfo>
                            <Size>Size: S</Size>
                            <Qty>Qty: 3</Qty>    
                            <Price>Rs. 1500</Price>
                        </PmicroInfo>
                    </PInfo>
                </ProductInfo>
                <Statuss>
                    <StatusKey>Status</StatusKey>
                    <Statusvalue>in-Transit</Statusvalue>
                </Statuss>
                <Statuss>
                    <DeliveryKey>Delevery expected by:</DeliveryKey>
                    <DeliveryValue>21 nov 2022</DeliveryValue>
                </Statuss>
            </Product>
            <hr/>
            <Product>
                <ProductInfo>
                    <Image src='https://5.imimg.com/data5/IB/YL/MY-552852/men-slim-fit-shirt-500x500.jpg'/>
                    <PInfo>
                        <ProductTitle>Men's Slim Fit T-Shirt</ProductTitle>
                        <PmicroInfo>
                            <Size>Size: S</Size>
                            <Qty>Qty: 3</Qty>    
                            <Price>Rs. 1500</Price>
                        </PmicroInfo>
                    </PInfo>
                </ProductInfo>
                <Statuss>
                    <StatusKey>Status</StatusKey>
                    <Statusvalue>in-Transit</Statusvalue>
                </Statuss>
                <Statuss>
                    <DeliveryKey>Delevery expected by:</DeliveryKey>
                    <DeliveryValue>21 nov 2022</DeliveryValue>
                </Statuss>
            </Product>
        </Bottom>
    </Container>
  )
}

export default SingleOrderSection