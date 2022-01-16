import { Navigate } from "react-router-dom";

import TransporterAc from "./components/TransporterAc";

const Account = ({ token, role }) => {

    if(!token) {
        return (
          <Navigate to="/login"/>
        );
    }

    if (role === "Transporter") {
      return (
        <TransporterAc />
      )
    }
return (
  
    
 <></>


);}
export default Account;