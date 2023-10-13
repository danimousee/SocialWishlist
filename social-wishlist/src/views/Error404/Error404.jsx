import React from 'react'
import Nav from '../../components/Nav/Nav'

function Error404() {
  return (
    <div className='content-box' style={{height: "90vh", justifyContent:"center"}}>
      <h2>Error 404: Page not found :(</h2>
      <Nav/>
    </div>
  )
}

export default Error404