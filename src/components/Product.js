import React, { useState, useEffect } from 'react'
//import { products } from '../DummyData'
import ProductItem from './ProductItem'
import styled from 'styled-components'
import axios from "axios"
import { mobile } from '../Responsive'
import { publicRequest } from '../axiosReqMethods'
import { setError } from '../redux/errorRedux'
import { useDispatch } from 'react-redux'
import ProductNotFound from './ProductNotFound'



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
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    ${mobile({
      padding: "0px",
      gap: "0"
    })}
`


function Product(props) {
  const {sort, cat, filter} = props;
  const [products, setProducts] =useState([])
  const [page, setPage] = useState(1)
  const {color, size} = filter || {}
  const [prevFilters, setPrevFilters] = useState({color: null, size: null, sort: null});
  const dispatch = useDispatch()

  useEffect(() => {
      setPrevFilters({sort, color, size});
      setPage(1)
  }, [sort, color, size]);


  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source()   
    let url = `/api/products/allinfo?page=${page}`
    if (cat) url += `&category=${cat}`
    if (color) url += `&color=${color}`
    if (size) url += `&size=${size}`
    if (sort) url += `&sort=${sort}`

    const getProducts = async () => { 
      try {
        const res = await publicRequest.get( url ,{cancelToken: axiosCancelToken.token}) 
        const filtersChanged = JSON.stringify(prevFilters) !== JSON.stringify({sort, color, size}) //checking if a filtering is changed
        if (filtersChanged) { //if changd then set new product
            setProducts(res.data);
        } else { //else append new product with prev product
            setProducts(p => [...p, ...res.data]);
        }
      } catch (error) {
        if(error.response.status === 404) return dispatch(setError(error.response.data.message))
        if(axios.isCancel(error)) return setProducts([]) //req canceled by user
        
        dispatch(setError(error.response.data.message))
    
      }
    } 
    getProducts();

    return () => {
      axiosCancelToken.cancel();
    }
  }, [cat, page, color, size,sort])


  
  //filter products logic
    useEffect(()=> {
      filter && filter.color === "Color" && delete filter.color;
      filter && filter.size === "Size" && delete filter.size;
    }, [filter])
  
  return (
    <>
      <Container className='container'>
        { !products.length ? <ProductNotFound title="Opps! No product Found" desc="Your filter did not match any product"/> 
        :
          <>
            <Wrapper>
              {products.map((Data)=> { return <ProductItem data={Data} key={Data._id} />})}       
            </Wrapper> 
            <LoadMore onClick={() => setPage(p => p+1)}>Load More</LoadMore>
          </>
        }
      </Container>
      
    </>
  )
}

export default Product