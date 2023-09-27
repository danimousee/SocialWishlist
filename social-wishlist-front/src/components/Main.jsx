
import { Outlet } from "react-router-dom";
import Back from "./back/Back";

const Main = () => {
  return (
    <div className="container">
    <main>
      <Back/>
      <Outlet/>
    </main>
    </div>
  );
};
export default Main;