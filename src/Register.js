
const Register = () => {
    return (
        <>
        <div className="login-wrapper">
      <h1>Register account</h1>
      <form>
      <label>
          <p>Nume</p>
          <input type="text" />
        </label>
        <label>
          <p>E-mail</p>
          <input type="text" />
        </label>
        <label>
          <p>Rol</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
        </>
    
    );}
    export default Register;