import { Navigate } from "react-router-dom";

const Home = ({ token }) => {

    if(!token) {
        return (
          <Navigate to="/login"/>
        );
    }

    return (
        <>
            <h1> Welcome on TruckApp! </h1>
        </>

    );}

export default Home;