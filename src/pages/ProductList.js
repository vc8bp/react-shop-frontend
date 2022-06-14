import React, {useEffect, useState} from 'react'
import Announcments from '../components/Announcments'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Product from '../components/Product'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { mobile } from '../Responsive'


const Container = styled.div`
    scroll-behavior: smooth;
`
const Title = styled.h1`
    margin: 20px 20px;
`
const FilterContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    font-size: 20px;
    font-weight: 600;
`
const FilterText = styled.span`
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    font-size: 15px;
    margin-right: 10px;
    
    &:hover {
        box-shadow: 3px 3px 2px -1px rgba(0,0,0,.2);
    }
    ${mobile({
        marginTop: "5px",
        width: "70%",
        marginLeft: "2px",
    })}
`
const Options = styled.option`

`

function ProductList(props) {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];

    //filters logic
    const [filter, setFilter] = useState({});
    const handleFiters = (e) => {
        const value = e.target.value;
        
        setFilter({
            ...filter,
            [e.target.name]: value,
        })  
        
    }

    

    //sort logic
    const [sort, setSort] = useState("Newest");
    


    //to change title as soon as component mounts
    useEffect(() => {
        document.title = `SatnamCreation - ${props.title}`
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
        <Announcments/>
        <Navbar/>
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name='color' onChange={handleFiters}>
                    <Options defaultValue>Color</Options>
                    <Options>red</Options>
                    <Options>green</Options>
                    <Options>blue</Options>
                    <Options>yallow</Options>
                    <Options>black</Options>
                    <Options>white</Options>
                </Select>
                <Select name='size' onChange={handleFiters}>
                    <Options defaultValue>Size</Options>
                    <Options>S</Options>
                    <Options>M</Options>
                    <Options>L</Options>
                    <Options>XL</Options>
                    <Options>XXL</Options>
                    <Options>XXXL</Options>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={e => setSort(e.target.value)}>
                    <Options defaultValue>Newest</Options>
                    <Options>price(L T H)</Options>
                    <Options>Price(H T L)</Options>
                    
                </Select>
            </Filter>
        </FilterContainer>
        <Product cat={cat} filter={filter} sort={sort} />
        <NewsLetter/>
        <Footer/>
        
    </Container>
  )
}

export default ProductList