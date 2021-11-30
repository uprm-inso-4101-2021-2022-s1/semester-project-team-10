import axios from "axios"

function LogIn(){
    let LogInData={
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }

      axios
      .post("http://localhost:8000/api/auth/login",LogInData )
      .then((res) => {
      console.log('done');
      window.location.reload();
      //localStorage.setItem('user',res.user.username)
      localStorage.setItem('token', res.token);});
  
  }
  
  function LogOut(){
    localStorage.removeItem('token');
    window.location.reload();
    axios
      .post("http://localhost:8000/api/auth/logout", "Token "+localStorage.getItem('token'))
      .then((res) => {
      //localStorage.remoteItem('user')
      localStorage.removeItem('token');
      window.location.reload();})
  }
  
  function SignIn(){
    let LogInData={
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      }
      axios
      .post("http://localhost:8000/api/auth/register",LogInData )
      .then((res) => {
      console.log('done');
      window.location.reload();
      //localStorage.setItem('user',res.user.username)
      localStorage.setItem('token', res.token);});
  
  }
const Login = () => {
    return (
        <div className="login-form display-block" id="login-form">
            <div className="login-cancel"></div>
            <h3 style={{margin: 0}}>Login Form</h3>

            <label>Username: </label>
      
            <span hidden={!localStorage.getItem('token')}>{localStorage.getItem('user')}</span>

            <input className="login-inputs" id="username" type="text" hidden={localStorage.getItem('token')}></input>
            &nbsp; &nbsp; &nbsp;

            <span hidden={localStorage.getItem('token')}>Email:</span>
            <input className="login-inputs" id="email" type="text" hidden={localStorage.getItem('token')}></input>
            &nbsp; &nbsp; &nbsp;

            <span  hidden={localStorage.getItem('token')}>Password:</span>
            <input className="login-inputs" id="password" type="text" hidden={localStorage.getItem('token')}></input>
            &nbsp; &nbsp; &nbsp;

            <div className="login-btn-box">
              <button className="login-btn" id="signin" hidden={localStorage.getItem('token')} onClick={SignIn}> Sign In</button>
              <button className="login-btn" id="login" hidden={localStorage.getItem('token')} onClick={LogIn}> Log In</button>
              <button className="login-btn" id="logout" onClick={LogOut}> Log Out</button>
            </div>
            
          </div>
    )
}

export default Login;