import React from 'react'
import TextField from '@mui/material/TextField'
import "./SearchBar.css"
import { Field, Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({search}) {

  const handleChange = (e) => {
    if(e.target.value === "") {
      search();
    }
    if(e.target.value.length >= 3) {
      search(e.target.value);
    }
  }

  return (
    <Formik initialValues={{
      searchStr: ""
    }} 
    >

      <Form style={{padding: 0}}>
    <div className='search-bar-box'>
      <label htmlFor='search-input' ><SearchIcon/></label>
      <input type='text' id='search-input' name='search-input' onChange={handleChange} className='search-input'/>

      {/* DELETE ME IF YOU SEE ME */}
      {/* <Field component={TextField} onChange={handleChange} name="searchStr" color="primary" fullWidth label="Search" id="search-bar" className='search-bar-text-field'/> */}
    </div>
        </Form>
      </Formik>
  )
}

SearchBar.propTypes = {
}

export default SearchBar