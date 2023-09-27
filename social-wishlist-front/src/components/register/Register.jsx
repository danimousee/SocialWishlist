import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"

const Register = () => {
  const [data, setData] = useState({
    nombre: "",
    cantidad_personas: 0,
    email: "",
    telefono: "",
    fecha_reserva: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const dataCopy = { ...data };
    dataCopy[name] = value;
    setData(dataCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
    .post("http://localhost:8080/LaMixtureria/Reservas/",data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));


  };

  return (
    <div className="formulario">

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        
        <input 
          required
          minLength={3}
          maxLength={50}
          pattern="[A-Za-z ]{1,32}"
          type="text"
          name="nombre"
          value={data.nombre}
          id="nombre"
          onInput={handleInput}
        />
        

        <label htmlFor="cantidad_personas">Personas</label>
        <input
          required
          min={1}
          max={5}
          type="number"
          name="cantidad_personas"
          id="cantidad_personas"
          value={data?.cantidad_personas || 1}
          onInput={handleInput}
        />

<label htmlFor="telefono">Telefono</label>
        <input
          required
          minLength={10}
          maxLength={10}
          type="tel"
          name="telefono"
          id="telefono"
          value={data?.telefono || ""}
          onInput={handleInput}
        />

<label htmlFor="fecha_reserva">Fecha de reserva</label>
        <input
          required
          type="datetime-local"
          name="fecha_reserva"
          id="fecha_reserva"
          value={data?.fecha_reserva || ""}
          onInput={handleInput}
        />

        <label htmlFor="email">email</label>
        <input
          required
          pattern="[^ @]*@[^ @]*"
          type="email"
          name="email"
          id="email"
          value={data?.email || ""}
          onInput={handleInput}
        /><br></br>
      
        <button>enviar</button>
      </form>
      
      
    </div>
  );
};

export default Register;