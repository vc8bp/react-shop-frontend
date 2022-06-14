import React, { useState, useEffect } from 'react'
//import { products } from '../DummyData'
import ProductItem from './ProductItem'
import styled from 'styled-components'
import axios from "axios"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

function Product(props) {
  const {sort, cat, filter} = props;

  const [products, setProducts] =useState([])
  const [filteredproducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      
      try {
        const res = await axios.get(cat ? `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/products/allinfo?category=${cat}` : `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/products/allinfo`) 
        !cat ? setProducts(res.data) : setProducts(res.data.sort((a, b) => -a.createdAt.localeCompare(b.createdAt)))
        
      } catch (error) {
        console.log(error)
      }
    }
    getProducts();
  }, [cat])

  //sort products logic
  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => -a.createdAt.localeCompare(b.createdAt))
      );
    } else if (sort === "price(L T H)") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort])
  
  //filter products logic
    useEffect(()=> {
      filter && filter.color === "Color" && delete filter.color;
      filter && filter.size === "Size" && delete filter.size;
      
      
      console.log(filter);
        cat && setFilteredProducts(products.filter((item)=> 
          Object.entries(filter).every(([key, value]) => item[key].includes(value))
        ))
    }, [products,cat,filter])
  
  
   
  
  return (
    <Container>
        { cat ?
        filteredproducts.map((Data)=> { return <ProductItem data={Data} key={Data._id} />})
        : products.map((Data)=> { return <ProductItem data={Data} key={Data._id} />})
        }
    </Container>
  )
}

export default Product