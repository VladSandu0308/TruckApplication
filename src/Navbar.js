import { Outlet, Link } from "react-router-dom";

const Navbar  = ({ token }) => {
    return (  
        <>
            {
                (token) ? (
                    <nav className="navbar" >
                        <h1> TruckApp </h1>
                        <div className="links">
                            <a href="/map" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Map </a>
                            <a href="/account" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Account </a>
                            <a href="/requests" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Offers </a> 
                            <a href="/logout" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Logout </a>              
                        </div>
                    </nav>
                ) : (
                    <nav className="navbar" >
                        <h1> TruckApp </h1>
                        <div className="links">
                            <a href="/register" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Register </a>
                            <a href="/login" style={{
                                color: "white",
                                backgroundColor: '#04395E',
                                borderRadius: '8px'
                            }} > Login </a>
                                            
                            
                            
                        </div>
                    </nav>
                )
            }
        </>
        

    );
}
 
export default Navbar ;