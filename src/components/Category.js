import React from 'react'
import { Categoris } from '../DummyData'
import CategoryItems from './CategoryItems'
import styled from 'styled-components'
import {mobile} from '../Responsive'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    
    
    ${mobile({
        flexDirection: "column",
        margin: "10px"
        
    })} 
`

function Category() {
  return (
    <div>
        <Container>
            {Categoris.map((item) => {
               return <CategoryItems item={item} key={item.id} />
           
            })}
        </Container>
    </div>
  )
}

export default Category
