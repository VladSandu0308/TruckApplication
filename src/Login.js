import PropTypes from 'prop-types';
import './Login.css';

const Login = () => {
    return (
        <>
        <div className="login-wrapper">
      <h1>Please log in</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
        </>
    
    );}
    export default Login;