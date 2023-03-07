import styled, { keyframes } from 'styled-components'
import React, {useState, useEffect} from 'react'
import { publicRequest } from '../axiosReqMethods'

const Container = styled.div`
    min-height: 40px;
    //height: 4vh;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    
`


function Announcments() {
  const [announcment, setannouncment] = useState("")
  useEffect( async () => {
    const data = await publicRequest.get(`/api/announcment`);
    setannouncment(data.data);

  }, [])
  
  return (
  
    <>
      {announcment && <Container>
        <marquee direction="left" scrollamount="15">
          {announcment.title}
        </marquee>
      </Container>}
    </>
    
  )
}

export default Announcments