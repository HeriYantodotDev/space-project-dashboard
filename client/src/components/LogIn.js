import googleLogo from '../google-logo.png';

import Logo from 'arwes/lib/Logo';

import Footer from './Footer';

import { useState } from 'react';

const GOOGLE_AUTH_URL = 'https://localhost:8000/v1/auth/google';
const LOGIN_AUTH_URL = 'https://localhost:8000/v1/auth/login';

// function submitLogin

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitSignIn = (event) => {

    let aguan = '';
    let aguan1 = '';
    let aguan3 = '';

    fetch(LOGIN_AUTH_URL, {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        email : email,
        password : password
      })
    })
      .then(response => {
        aguan = response.status;
        aguan1 = response.redirected;
        aguan3 = response
        if(response.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err));

      console.log(aguan);
      console.log(aguan1);
      console.log(aguan3);

  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Logo animate size={50}  layer="header" />
      <h1 className='mb-4'>Space Project Mission Control Dashboard</h1>
      <div style={{ border: "2px solid white", padding: "1rem", marginBottom: "1rem", width: "60vw" }}>
        <h2 className="mb-4" style={{ fontSize: "1.5rem", textAlign: "center" }}>Sign In With Google</h2>
        <div className="btn btn-outline-light">
          <a href={GOOGLE_AUTH_URL}><i className="fab fa-google"></i> <img alt="Google logo" src={googleLogo} /> Sign in with Google</a>
        </div>
      </div>
      <div style={{ border: "2px solid white", padding: "1rem", width: "60vw" }}>
        <h2 className="mb-4" style={{ fontSize: "1.5rem", textAlign: "center" }}>Sign In with Email</h2>
        <form style={{ width: "100%" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={onEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={onPasswordChange} type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Try this: sheldon@gmail.com || pass: 123</label>
          </div>
          <button onClick={onSubmitSignIn} type="button" className="btn btn-outline-light">
            Sign in with Email
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
