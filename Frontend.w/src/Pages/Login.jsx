import React, { useState } from "react";
import { InputField, Button, logIn } from "../index.js";
import "../../Assets/CSS/Login-Signup.css";

const Login = () => {
   const [userID, setUserID] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");

   return (
      <>
         <div className="outline"></div>
         <div className="modal flex-center">
            <div className="container-600x100 flex-center">
               <h1>Login</h1>
            </div>
            <div className="container-600x400 flex-center">
               <InputField
                  name="user-id"
                  maxLength={10}
                  value={userID}
                  setValue={setUserID}
                  placeHolder="User Id"
                  label="Enter User ID"
                  type="text"
               ></InputField>
               <InputField
                  name="password"
                  value={password}
                  setValue={setPassword}
                  placeHolder="Password"
                  label="Enter Password"
                  type="password"
               ></InputField>
            </div>
            <div className={`container-600x20 flex-center`}>{message}</div>
            <div className="container-600x100 flex-center">
               <Button
                  onClick={function () {
                     logIn(userID, password, setMessage);
                  }}
               >
                  Login
               </Button>
            </div>
         </div>
      </>
   );
};

export default Login;
