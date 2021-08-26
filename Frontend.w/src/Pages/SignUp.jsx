import React, { useState, useEffect } from "react";
import { InputField, Button, checkPasswordStrength, signUp } from "../index.js";
import "../../Assets/CSS/Login-Signup.css";

const SignUp = () => {
   const [userID, setUserID] = useState("");
   const [password, setPassword] = useState("");
   const [rePassword, setRePassword] = useState("");
   const [message, setMessage] = useState({ value: "", color: "" });

   useEffect(() => {
      if (password !== "") {
         setMessage(checkPasswordStrength(password));
      }
   }, [password]);

   return (
      <>
         <div className="outline"></div>
         <div className="modal flex-center">
            <div className="container-600x100 flex-center">
               <h1>Sign Up</h1>
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
               <InputField
                  name="repassword"
                  value={rePassword}
                  setValue={setRePassword}
                  placeHolder="Password"
                  label="Re-enter Password"
                  type="password"
               ></InputField>
            </div>
            <div className={`container-600x20 flex-center ${message.color}`}>
               {message.value}
            </div>
            <div className="container-600x100 flex-center">
               <Button
                  onClick={function () {
                     signUp(userID, password, rePassword, setMessage);
                  }}
               >
                  Sign Up
               </Button>
            </div>
         </div>
      </>
   );
};

export default SignUp;
