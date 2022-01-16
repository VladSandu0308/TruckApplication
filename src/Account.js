import { Navigate } from "react-router-dom";
import ClientAc from "./components/ClientAc";

import TransporterAc from "./components/TransporterAc";

const Account = ({ token, role, name }) => {

    if(!token) {
        return (
          <Navigate to="/login"/>
        );
    }

    if (role === "Transporter") {
      return (
        <TransporterAc name={name} />
      )
    }

    if (role === "Client") {
      return (
        <ClientAc name={name} />
      )
    }


    return (    
    <></>
    );
}
export default Account;