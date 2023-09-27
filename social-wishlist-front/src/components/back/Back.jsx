import { Link } from "react-router-dom";
//import Images from "../images/images";
import logo from "../../imagenes/Logo_LAMIXTURERIA.png";


const Back = () => {
  return (
    <div className="back">
      <div className="logo">
        <Link to={"/LaMixtureria"}>
          {/* <Images url={logo} /> */}
        </Link>
      </div>
    </div>
  );
};
export default Back;