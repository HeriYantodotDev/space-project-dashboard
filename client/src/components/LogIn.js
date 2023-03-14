import googleLogo from '../google-logo.png';

import Logo from 'arwes/lib/Logo';

import { useEffect, useState } from 'react';


const GOOGLE_AUTH_URL = 'v1/auth/google';
const LOGIN_AUTH_URL = 'v1/auth/login';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect( ()=> {
    if (window.location.pathname.includes('/tempURL/failed/googleauth/')) {
      const error = "Can't Log In with Google. Check Your Email & Password";
      setErrorMessage(error);
    } else if (window.location.pathname.includes('/tempURL/mustLogIn')) {
      const error = "You Must Log In First";
      setErrorMessage(error);
    }
  }, []);
  

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }


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
<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  maxWidth: "600px" }} >
    <div style={{ marginTop: "2rem" }}><Logo animate size={50} /></div>
    <div style={{ marginBottom: "1rem", fontSize: "2rem", textAlign: "center" }}>Mission Control Dashboard</div>
  </div>

  <div style={{ border: "2px solid white", padding: "1rem"}}>
    <div style={{ marginBottom: "1rem", fontSize: "1.5rem", textAlign: "center",  }}>Log in to your account</div>
    
    <form>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="exampleInputEmail1" style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>Email address</label>
        <input onChange={onEmailChange} type="email" style={{ width: "100%", padding: "0.5rem" }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="exampleInputPassword1" style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>Password</label>
        <input onChange={onPasswordChange} type="password" style={{ width: "100%", padding: "0.5rem" }} id="exampleInputPassword1" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.8rem" }} className="form-check-label" htmlFor="exampleCheck1">Try this: sheldon@gmail.com || pass: 123</label>
      </div>
      <button 
        onClick={onSubmitSignIn} 
        type="button" 
        style={{
          backgroundColor: "transparent", 
          color: "white", 
          border: "1px solid white", 
          padding: "0.5rem 1rem",
          cursor: "pointer", 
          outline: "none",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "gray"}
        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        onMouseDown={(e) => e.target.style.backgroundColor = "gray"}
        onMouseUp={(e) => e.target.style.backgroundColor = "white"}
      >
        Sign in
      </button>

    </form>

    <p style={{ marginBottom: "1.5rem", fontSize: "1rem", textAlign: "center" }}>----- OR -----</p>

    <a href={GOOGLE_AUTH_URL} style={{ textDecoration: "none" }}>
      <div style={{ 
        marginBottom: "1rem", 
        backgroundColor: "transparent", 
        color: "white", 
        border: "1px solid white", 
        padding: "0.5rem 1rem", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        cursor: "pointer"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "grey"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      onClick={(e) => e.target.style.backgroundColor = "gray"}>
        <i className="fab fa-google" style={{ marginRight: "0.5rem" }}></i> <img alt="Google logo" src={googleLogo} /> Sign in with Google
      </div>
    </a>


    <div style={{ backgroundColor: "red", color: "white"}}>
      {errorMessage}
    </div>
  
  </div>
</div>



  //   <div className="d-flex flex-column justify-content-center align-items-center" >
  //   <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: "90vw", maxWidth: "600px" }} >
  //     <div className='mt-2'><Logo animate size={50} /></div>
  //     <h2 className='mb-4' style={{ fontSize: "2rem", textAlign: "center" }}>Mission Control Dashboard</h2>
  //   </div>

  //   <div style={{ border: "2px solid white", padding: "1rem"}}>
  //     <h2 className="mb-4" style={{ fontSize: "1.5rem", textAlign: "center" }}>Log in to your account</h2>
      
  //     <form>
  //       <div className="mb-3">
  //         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //         <input onChange={onEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Your Email' />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //         <input onChange={onPasswordChange} type="password" className="form-control" id="exampleInputPassword1" />
  //       </div>
  //       <div className="mb-3">
  //         <label className="form-check-label" htmlFor="exampleCheck1">Try this: sheldon@gmail.com || pass: 123</label>
  //       </div>
  //       <button onClick={onSubmitSignIn} type="button" className="btn btn-outline-light">
  //         Sign in
  //       </button>
  //     </form>

  //     <p className='mt-3 mb-3' style={{ fontSize: "1rem", textAlign: "center" }}>----- OR -----</p>

  //     <a href={GOOGLE_AUTH_URL}>
  //       <div className="btn btn-outline-light">
  //         <i className="fab fa-google"></i> <img alt="Google logo" src={googleLogo} /> Sign in with Google
  //       </div>
  //     </a>   

  //     <div className='bg-danger text-white' >
  //       {errorMessage}
  //     </div>
    
  //   </div>
  // </div>
    
  );
};

export default LogIn;


// onSubmitSignIn
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


  // return (
  
  // );