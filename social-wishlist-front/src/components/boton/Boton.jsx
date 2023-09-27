import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



const Boton = ({ name, url }) => {
  return (
    <div>
      <Link to={url}>
        <Button className='boton' variant='outline-light'>
          {name}
        </Button>
      </Link>
    </div>
  );
};

export default Boton;