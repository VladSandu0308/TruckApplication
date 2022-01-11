import { Outlet, Link } from "react-router-dom";

const Navbar  = () => {
    return (  
        <nav className="navbar" >
            <h1> TruckApp </h1>
            <div className="links">
                <a href="/" style={{
                    color: "white",
                    backgroundColor: '#04395E',
                    borderRadius: '8px'
                }} > Home </a>
                <a href="/map" style={{
                    color: "white",
                    backgroundColor: '#04395E',
                    borderRadius: '8px'
                }} > Map </a>
                  <a href="/login" style={{
                    color: "white",
                    backgroundColor: '#04395E',
                    borderRadius: '8px'
                }} > Login </a>
                
                
                
            </div>
        </nav>

    );
}
 
export default Navbar ;