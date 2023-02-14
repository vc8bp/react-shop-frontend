import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Image = styled.img`
  width: 500px;
  max-width: 100%;
  
`
const Title = styled.h3`
  font-size: 30px;
  margin: 10px 0;
  text-align: center;
`
const Desc = styled.span`
  font-size: 20px;
  font-weight: 200;
  text-align: center;
`

function ProductNotFound({title, desc}) {
    const imageURl = "https://media.discordapp.net/attachments/912996760589316120/1065268393818730626/55331383676.png?width=1023&height=683"
  return (
    <Container>
        <Image src={imageURl} />
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <Desc>Please try again</Desc>
    </Container>
  )
}

export default ProductNotFound