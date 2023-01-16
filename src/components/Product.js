import React, { useState, useEffect } from 'react'
//import { products } from '../DummyData'
import ProductItem from './ProductItem'
import styled from 'styled-components'
import axios from "axios"
import { mobile } from '../Responsive'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
    margin-bottom: 30px;
`
const LoadMore = styled.button`
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
const Wrapper = styled.div`
  padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    ${mobile({
      padding: "0px"
    })}
`


function Product(props) {
  const {sort, cat, filter} = props;

  const [products, setProducts] =useState([])
  const [filteredproducts, setFilteredProducts] = useState([])

  const [reqcancled , setReqCancle] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source()

    if(!reqcancled) {
      
      const getProducts = async () => { 
        try {
          const res = await axios.get(cat ? `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/products/allinfo?category=${cat}` : `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/products/allinfo` ,{cancelToken: axiosCancelToken.token}) 
          !cat ? setProducts(res.data) : setProducts(res.data.sort((a, b) => -a.createdAt.localeCompare(b.createdAt)))
          
        } catch (error) {
          if(axios.isCancel(error)) {
            console.log("req cancled by user");
          } else console.log(error)
        }
      } 
      getProducts();
      
    }
    return () => {
      axiosCancelToken.cancel();
      setReqCancle(true);
    }
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
    <>
      <Container className='container'>
        <Wrapper>

          { cat ?
          filteredproducts.map((Data)=> { return <ProductItem data={Data} key={Data._id} />})
          : products.map((Data)=> { return <ProductItem data={Data} key={Data._id} />})
          }
          
         </Wrapper> 
         <LoadMore onClick={() => setPage(p => p+1)}>Load More</LoadMore>
      </Container>
      
    </>
  )
}

export default Product