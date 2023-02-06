import {useEffect, useState} from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { publicRequest } from '../axiosReqMethods';
import ReviewSingleComp from './ReviewSingleComp';
import { setError } from '../redux/errorRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    padding: 30px 4vw;
`
const Top = styled.div`
    margin-bottom: 10px;
`
const TitleWAR = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const Title = styled.h2`

`
const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid teal;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 128, 128, 0.1);
    transition: all 0.3s ease-in-out;
    :hover {
        background-color: teal;
        color: white;
        box-shadow: 0 5px 15px rgba(0, 128, 128, 0.3);
    }
`
const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const RatingCount = styled.span`
    font-size: 30px;
    color: #FAAF00;
`
const Hr = styled.div` //style took from google
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
`

const Bottom = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`








function ReviewComp({productID, productName, ratingCount, rating, setModal}) {
    const user = useSelector(s => s.user.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState();
    useEffect(() => {
      (async () => {
        try {
            const {data} = await publicRequest.get(`/api/review/${productID}`)  
            setReviews(data)
        } catch (error) {
            console.log(error)
            dispatch(setError(error.response.data.message))
        }
      })()
    }, [])

    const handleWriteReview = () => {
        if(!user) navigate('/login')
        setModal(true)
    }
    
  return (
    <Container>
        <Top>
            <TitleWAR>
                <Title>{productName}</Title>
                <Button onClick={handleWriteReview} ><DriveFileRenameOutlineIcon/> Write a Review</Button>
            </TitleWAR>
            <RatingWrapper>
                <RatingCount>{rating}</RatingCount><Rating value={rating} readOnly precision={0.1} /> 
                {ratingCount} Reviews
            </RatingWrapper>
        </Top>
        <Hr/>
        <Bottom>
            {reviews?.map((r) => {
                return <ReviewSingleComp review={r} key={r._id}></ReviewSingleComp>
            })}
        </Bottom>
    </Container>
  )
}

export default ReviewComp