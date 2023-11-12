import React, { useState } from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { addProduct } from '../../firebase/queries/products';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/SaveAlt';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import SuccessComponent from '../../components/SuccessComponent/SuccessComponent';
import FailComponent from '../../components/FailComponent/FailComponent';
import { Box, CircularProgress } from "@mui/material";


const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

const validationSchema = yup.object({
    name: yup.string('Ingresa el nombre').required('El nombre es requerido'),
    images: yup.string().matches(URL, 'Ingresa una URL valida').required('La imagen es requerida'),
    url: yup.string().matches(URL, 'Ingresa una URL valida').required('El link es requerido'),
  //  provider: yup.required('Ingresa el provider')
});

const initialValues = {
  name: '',
  images: '',
  url: '',
  provider: { name: 'Mercado Libre', id: 'MELI' },
  category: { name: 'Arte', id: 'Arte' }
};

const optionsProvider = [
  { name: 'Mercado Libre', id: 'MELI' },
  { name: 'Facebook', id: 'FACE' },
  { name: 'Instagram', id: 'INSTA' },
  { name: 'Otros', id: 'OTHER' },
];

const optionsCategory = [
  { name: 'Cars', id: 'Cars' },
  { name: 'Technology', id: 'Technology' },
  { name: 'Travel', id: 'Travel' },
  { name: 'Toys', id: 'Toys' },
  { name: 'Sports', id: 'Sports' },
  { name: 'Games', id: 'Games' },
  { name: 'Clothes', id: 'Clothes' },
  { name: 'Food', id: 'Food' },
  { name: 'Beauty', id: 'Beauty' },
  { name: 'Home', id: 'Home' },
];

const Add = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const submit = async values => {
    setIsLoading(true);
    setSubmitResult(null);

    try {
      // Preparar los valores como antes
      const arrayimages = [];
      arrayimages[0] = values.images;
      values.images = arrayimages;

      values.provider = values.provider.id;
      values.category = values.category.id;

      // Intentar hacer el envío
      await dispatch(addProduct(values));
      setSubmitResult('success');
    } catch (error) {
      // Manejar el error
      setSubmitResult('fail');
    } finally {
      // Detener la carga después de un segundo, independientemente del resultado
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  if (isLoading) {
      <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        <CircularProgress color="secondary" />
      </Box>
  }

  if (submitResult === 'success') {
    return <SuccessComponent />; // Componente o mensaje de éxito
  }

  if (submitResult === 'fail') {
    return <FailComponent />; // Componente o mensaje de fallo
  }

  return (
    <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
      {({ handleChange, values, setFieldValue, handleBlur, handleReset, isSubmitting, errors, touched }) => (
        <Form>
          <div className="main-box">
            <div className="content-box">
              <TextField color="primary" fullWidth
                label="Name"
                id="name"
                name="name"
                className='search-bar-text-field'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <Autocomplete color="primary" className='search-bar-text-field' fullWidth
                id="category"
                name="category"
                options={optionsCategory}
                onChange={(e, value) => {
                  setFieldValue(
                    "category",
                    value !== null ? value : initialValues.category
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Category" name="category" />}
                value={values.category}
                //onBlur={handleBlur}
                //error={touched.category && Boolean(errors.category)}   
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name}
              />

              <Autocomplete color="primary" className='search-bar-text-field' fullWidth
                id="provider"
                name="provider"
                options={optionsProvider}
                onChange={(e, value) => {
                  setFieldValue(
                    "provider",
                    value !== null ? value : initialValues.provider
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Provider" name="provider" />}
                value={values.provider}
                //onBlur={handleBlur}
                //error={touched.provider && Boolean(errors.provider)}   
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name}
              />

              <TextField color="primary" fullWidth
                label="Image URL"
                id="images"
                name="images"
                className='search-bar-text-field'
                value={values.images}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.images && Boolean(errors.images)}
                helperText={touched.images && errors.images}
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                // }}
              />

              <TextField color="primary" fullWidth
                label="Store page URL"
                id="url"
                name="url"
                className='search-bar-text-field'
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.url && Boolean(errors.url)}
                helperText={touched.url && errors.url}
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                // }}
              />

              <button className='button-save' type="submit">SAVE</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

};
  
 


export default Add