import React, { useEffect, useState } from "react";
import landingimage from "../img/landingimage.png";
import logo from "../img/logo.png"
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const postData = () => {
  
    if(!email || !password || !userName || !name){
      notifyA("Please add all the fields")
      return
    }
   else if (!emailRegex.test(email)) {
      notifyA("Invalid email.Please try again")
      return
    } else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number,1 lowercase and uppercase alphabet and special characters")
      return
    }

    // Sending data to server
    fetch("https://instaclone-backend-5nw3.onrender.com/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (
    <div className="signUp">
      <div className="landingimagediv">
        <img className="landingimage" src={landingimage} alt="" />
      </div>
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="" />
          <p className="loginPara">
            Sign up to see photos and post photos <br /> in clone Instagram
          </p>
          <div className="input-tags">
          <div>
            <input type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={((e) => { setName(e.target.value) })} />
          </div>
          <div>
            <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          </div>
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
