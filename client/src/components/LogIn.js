import googleLogo from '../google-logo.png';

import Logo from 'arwes/lib/Logo';

import Footer from './Footer';

import { useState } from 'react';


const GOOGLE_AUTH_URL = 'https://localhost:8000/v1/auth/google';
const LOGIN_AUTH_URL = 'https://localhost:8000/v1/auth/login';



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  //This is to check the header of the reponse


  // const onSubmitSignIn = (event) => {
    // const httpHeaderStatusName = 'X-AuthenticationStatus-Status';
    // const httpHeaderMessageName = 'X-Message';
    // const valueHeaderStatusSuccessful = `successful`;
    // const valueHeaderStatusFailed = `failed`;
  //   fetch(LOGIN_AUTH_URL, {
  //     method : 'post',
  //     headers : {'Content-Type' : 'application/json'},
  //     body : JSON.stringify({
  //       email : email,
  //       password : password
  //     })
  //   })
  //     .then(response => {
  //       if (response.headers.get(`${httpHeaderStatusName}`) === `${valueHeaderStatusSuccessful}`) {
  //         window.location.reload();
  //       } else if (response.headers.get(`${httpHeaderStatusName}`) === `${valueHeaderStatusFailed}`) {
  //         setErrorMessage(response.headers.get(`${httpHeaderMessageName}`));
  //       } else {
  //         console.log("Unexpected response status: ", response);
  //       }
  //     })
  //     .catch(err => console.log(err));
      
  // }


//This is to check the body of the reponse
  const onSubmitSignIn = (event) => {
    fetch(LOGIN_AUTH_URL, {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        email : email,
        password : password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.authenticationStatus);
        if (data.authenticationStatus) {
          window.location.reload();
        } else {
          setErrorMessage(data.message);
        }
      }) 
      .catch(err => console.log(err));
  }


  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Logo animate size={50}  layer="header" />
      <h1 className='mb-4'>Space Project Mission Control Dashboard</h1>
      <div style={{ border: "2px solid white", padding: "1rem", marginBottom: "1rem", width: "60vw" }}>
        <h2 className="mb-4" style={{ fontSize: "1.5rem", textAlign: "center" }}>Sign In With Google</h2>
        <a href={GOOGLE_AUTH_URL}>
          <div className="btn btn-outline-light">
            <i className="fab fa-google"></i> <img alt="Google logo" src={googleLogo} /> Sign in with Google
          </div>
        </a>   
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
      <div className='bg-danger text-white'>
        {errorMessage}
      </div>

      <Footer />
    </div>
  );
};

export default LogIn;
