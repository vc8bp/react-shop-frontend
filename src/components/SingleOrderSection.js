import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    background-color: white;
    width: 95%;
    padding: 20px 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    @media screen and (max-width: 850px) {
        padding: 20px 0px;
    }
`
const Top = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px;
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
    max-height: fit-content;
    margin: 10px;
    @media screen and (max-width: 675px) {
        flex-direction: column;
        height: 400px;
    }
`
const ProductInfo = styled.div`
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    display: flex;
    padding: 5px;
    gap: 10px;
`
const Image = styled.img`
    max-width: 200px;
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
    gap: 5px;
    @media screen and (max-width: 850px) {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
`
const Qty = styled.div`
    border-right: solid 1px teal;
    padding-right: 5px;
    @media screen and (max-width: 850px) { //magic nubers
        border-right: none;
        padding-right: 0;
    }
`
const Size = styled.div`
    border-right: solid 1px teal;
    padding-right: 5px;
    @media screen and (max-width: 850px) { //magic nubers
        border-right: none;
        padding-right: 0;
    }

`
const Price = styled.div`
    font-weight: 600;
    font-size: 20px;
`
const StatusWrapper = styled.div`
    flex: 1;
    display: flex;
    @media screen and (max-width: 675px) { //magic nubers
        flex: 2;
        width: 100%;
    }
`

const Statuss = styled.div`
    flex: 1;
    display: flex;
    gap: 0.3rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StatusKey = styled.span`

`
const DeliveryKey = styled.span`
`
const DeliveryValue = styled.span`
    font-size: 25px;
    font-weight: 600;
    @media screen and (max-width: 675px) { //magic nubers
        font-size: 1rem;
    }
`

//status//
const statusColors = {
    pending: { background: "FDF6B2", color: "C6783B" },
    processing: { background: "DEF7EC", color: "87A66E" },
    delivered: { background: "E1EFFE", color: "3F91FA" }
};  
const Status = styled.p`
    font-weight: 500;
    margin: 0;
    padding: 0.3rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    border-radius: 50px;
    background-color: #${({ status }) => statusColors[status]?.background};
    color: #${({ status }) => statusColors[status]?.color};
`;
//status END//



function SingleOrderSection({order}) {
  return (
    <Container>
        <Top>
            <OrderID>Order ID : {order.paymentInfo.razorpay_payment_id}</OrderID>
            <OrderPlacedTime>Order placed : {new Date(order.createdAt).toDateString()}</OrderPlacedTime>
        </Top>
        <hr/>
        <Bottom>
            {order.products.map(pro => {
                return <React.Fragment key={pro._id}>
                <Product>
                <ProductInfo>
                    <Image src={pro.img}/>
                    <PInfo>
                        <ProductTitle>{pro.title}</ProductTitle>
                        <PmicroInfo>
                            <Size>Size: {pro.size}</Size>
                            <Qty>Qty: {pro.quantity}</Qty>    
                            <Price>Rs. {pro.price}</Price>
                        </PmicroInfo>
                    </PInfo>
                </ProductInfo>
                <StatusWrapper>
                    <Statuss>
                        <StatusKey>Status</StatusKey>
                        <Status status={order.orderStatus}>{order.orderStatus}</Status>
                    </Statuss>
                    <Statuss>
                        <DeliveryKey>Delevery expected by:</DeliveryKey>
                        <DeliveryValue>{new Date(order.ExpectedDelevery).toDateString()}</DeliveryValue>
                    </Statuss>
                </StatusWrapper>
            </Product>
            <hr/>             
            </React.Fragment>
            })}
        </Bottom>
    </Container>
  )
}

export default SingleOrderSection