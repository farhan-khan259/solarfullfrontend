import logo from "../../Assets/Pictures/Solarxlogo-removebg-preview.png";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img className="logo" src={logo} alt="" />
      <div className="curved-spinner"></div>
      <p>Loading Please Wait!...</p>
    </div>
  );
};

export default Loader;
