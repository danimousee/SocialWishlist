import Boton from "./boton/Boton";

const Home = () => {
    return (
      <div className="container">
        <Boton name={"Nuestra Carta"} url= {"/LaMixtureria/Carta"} />
        <br></br>
        <Boton name={"Reservas"} url= {"/LaMixtureria/Reservas"} />
        <br></br>
        <Boton name={"Sucursales"} url= {"/LaMixtureria/Sucursales"} />
      </div>
    )
  }
  export default Home
