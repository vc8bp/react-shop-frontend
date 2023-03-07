import React, {useEffect} from 'react'
import Announcments from '../components/Announcments'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Product from '../components/Product'
import Slider from '../components/Slider'
import "../app.css"
import styled from 'styled-components'

const Title = styled.h2`
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 15px;
    margin-left: 5px;
`

const Home = (props) => {
 
  //to change title as soon as component mounts
  useEffect(() => {
    document.title = `SatnamCreation - ${props.title}`
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Announcments/>
      <Navbar/>
      <Slider/>
      <Category />
      <div className='container'>
        <Title>Top Products</Title><br/>
        <Product sort="toppurchased"/>
      </div> 
      <NewsLetter/>
      <Footer/>
    </>
    
  )
}

export default Home