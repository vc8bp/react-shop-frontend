import React, {useEffect} from 'react'
import Announcments from '../components/Announcments'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Product from '../components/Product'
import Slider from '../components/Slider'

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
      <Product />
      <NewsLetter/>
      <Footer/>
    </>
    
  )
}

export default Home