import React from 'react'
import TextField from '@mui/material/TextField'
import "./SearchBar.css"

function SearchBar() {
  return (
    <div className='search-bar-box'>
        <TextField color="primary" fullWidth label="Search" id="search-bar" className='search-bar-text-field'/>
        {/* <label for="search-bar" className="hide">Search</label>
        <input type="text" placeholder='Buscar'/> */}
    </div>
  )
}

export default SearchBar