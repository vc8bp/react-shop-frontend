import React from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import timeSince from "../utils/timeSince.js"
import { userRequest } from '../axiosReqMethods.js';
import { setError } from '../redux/errorRedux.js';
import { useDispatch } from 'react-redux';

const Container = styled.div`
    display: flex;
    gap: 10px;
`
const Left = styled.div`

`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Right = styled.div`
    width: 100%;
`
const Name = styled.p`
    margin: 15px 0px;
    font-size: 20px;
    font-weight: 500;
`
const Star = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`
const Date = styled.span``
const Review = styled.div``
const Feedback = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Helpful = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    :hover {
        color: blue;
    }
`
const Report = styled.div`
    color: red;
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`


function ReviewSingleComp({review}) {
    const dispatch = useDispatch();
    const handleUpVote = async () => {
        try {
            const {data} = await userRequest.put(`/api/review/upvote/${review._id}`)
            dispatch(setError(data.message))
        } catch (error) {
            console.log(error)
            dispatch(setError(error.response.data.message))
        }
    }   

    const handleReport = async () => {
        try {
            const {data} = await userRequest.put(`/api/review/abuse/${review._id}`)
            dispatch(setError(data.message))
        } catch (error) {
            console.log(error)
            dispatch(setError(error.response.data.message))
        }
    }   

  return (
    <Container>
        <Left>
            <Avatar src={review.user.avatar} />
        </Left>
        <Right>
            <Name>{`${review.user.firstName} ${review.user.lastName}`}</Name>
            <Star>
                <Rating value={review.rating} readOnly precision={0.1} />
                <Date>{timeSince(review.createdAt)}</Date>
            </Star>
            <Review>
                {review.review}
            </Review>
            <Feedback>
                <Helpful onClick={handleUpVote}>
                    <ThumbUpOffAltIcon style={{fontSize: "30px"}}/>   Helpful?
                </Helpful>
                <Report onClick={handleReport} >Report as inappropriate</Report>
            </Feedback>
        </Right>  
    </Container>
  )
}

export default ReviewSingleComp