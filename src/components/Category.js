import React from 'react'
import { Categoris } from '../DummyData'
import CategoryItems from './CategoryItems'
import styled from 'styled-components'
import {mobile} from '../Responsive'

const Container = styled.div`
    width: max-content;
    max-width: 100%;
    margin: auto;
    margin-bottom: 60px;
`

const Title = styled.div`
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 15px;
    margin-left: 5px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;  
    gap: 10px;
    
     
    ${mobile({
        flexDirection: "column",
        margin: "10px"
        
    })} 
`

function Category() {
  return (
    <Container>   
      <Title>Categories</Title>
      <Wrapper>
          {Categoris.map((item) => {
              return <CategoryItems item={item} key={item.id} />
          
          })}
      </Wrapper>
    </Container>
  )
}

export default Category
