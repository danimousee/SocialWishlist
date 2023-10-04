import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";

import { Carousel } from "react-responsive-carousel";

import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/SaveAlt';

import avatar from './../../img/pic1.jpg'
import avatar2 from './../../img/pic2.jpg'
import avatar3 from './../../img/pic3.jpg'

function Add() {
  return (
    <div className="main-box">
      <div className="content-box">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off">
            <Carousel showThumbs={false} autoPlay >
                <div>
                    <img src={avatar} />
                </div>
                <div>
                    <img src={avatar2} />
                </div>
                <div>
                    <img src={avatar3} />
                </div>
            </Carousel>
          <TextField color="primary" fullWidth label="Nombre" id="txt-nombre" required className='search-bar-text-field' />
          <TextField color="primary" fullWidth label="¿Por qué lo quiero?" id="txt-nombre" multiline required className='search-bar-text-field' rows={4}/>
          <Button variant="contained" color="success" startIcon={<SaveIcon />}>GUARDAR</Button>
        </Box>
      </div>
    </div>
  )
}

export default Add