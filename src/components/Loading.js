import { Height } from '@material-ui/icons'
import React from 'react'
import gif from '../assets/loadingGIF.gif'

const divStyle = {
    width: "100vw",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const imgStyle = {
    width: "100px",
    height: "100px"
}

function Loading() {
  return (
    <div style={divStyle}>
        <img src={gif} style={imgStyle} alt="Loading...."/>
    </div>
  )
}

export default Loading