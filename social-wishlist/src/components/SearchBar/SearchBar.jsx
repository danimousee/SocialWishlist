import React from 'react'
import TextField from '@mui/material/TextField'
import "./SearchBar.css"
import { Field, Form, Formik } from 'formik';

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

      <Form>
    <div className='search-bar-box'>
      <Field component={TextField} onChange={handleChange} name="searchStr" color="primary" fullWidth label="Search" id="search-bar" className='search-bar-text-field'/>
    </div>
        </Form>
      </Formik>
  )
}

SearchBar.propTypes = {
}

export default SearchBar