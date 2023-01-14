import React, {useState} from 'react'
import ModalComp from './ModalComp'
import styled from 'styled-components'
import { Rating } from '@mui/material'
import { userRequest } from '../axiosReqMethods'
import { useSelector } from 'react-redux'
import ErrorComponent from './ErrorComponent'
import {v4 as uuid} from 'uuid'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
const UserWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Name = styled.span`
    font-size: 20px;
`
const RatingWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
const TextBox = styled.textarea`
    width: 400px;
    max-width: 90%;
    border: 3px solid teal;
    font-size: 15px;
    padding: 10px 10px;
    height: 150px;
    border-radius: 1vmin;

`
const ButtonWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`
const Button = styled.button`
    margin: 10px;      
    padding: 10px 20px;
    border-radius: 1vmax;
    border: 1px solid teal;
    background-color: ${p => p?.T==="submit" ? "teal": "white"};;
    font-weight: 600;
    color: ${p => p.T==="submit" ? "white": "teal"};
    cursor: pointer;
`


function WriteaReview({product, isOpen, setModal}) {
    const user = useSelector(d => d.user.currentUser)
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [responce, setResponce] = useState("")

    const handleSubmit = async () => {
        console.log("me runed")
        try {           
            const {data} = await userRequest.post(`/api/review/${product._id}`,{rating, review})
            if(data.success){
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

  return (
    <ModalComp isOpen={isOpen}>
        <Container>
            <h1>{product.title}</h1>
            <UserWrapper>
                <Image src={user?.avatar} />
                <Name>{`${user?.firstName} ${user?.lastName}`}</Name>
            </UserWrapper>
            <RatingWrapper>
                <Rating 
                    style={{fontSize: "40px"}} 
                    value={rating} 
                    onChange={(e, newValue) => {
                        setRating(newValue);
                    }}
                    precision={0.1}
                >           
                </Rating>
                <TextBox placeholder='Share your thoughts on this product...' onChange={(e) => setReview(e.target.value)}></TextBox>
            </RatingWrapper>
            <ButtonWrapper>
                <Button onClick={() => setModal(false)} >Cancel</Button>
                <Button T="submit" onClick={handleSubmit}>Submit</Button>
            </ButtonWrapper>
        </Container>
    </ModalComp>

  )
}

export default WriteaReview