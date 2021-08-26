import React, { useState, useEffect } from "react";
import "../../Assets/CSS/styles.css";
import { Link } from "react-router-dom";

const Home = () => {
   const token = localStorage.getItem("token") || undefined;
   const [user, setUser] = useState(undefined);
   const [url, setUrl] = useState("");
   const [shortUrl, setShortUrl] = useState("");
   const [toggleCustomUrl, setToggleCustomUrl] = useState(true);
   const [message, setMessage] = useState("");
   const [buttonText, setButtonText] = useState("Add Custom URL");

   useEffect(() => {
      if (token) {
         fetch("http://localhost:3000/getuser", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${token}`,
            },
         })
            .then((response) => response.json())
            .then((data) => {
               setUser(data);
            })
            .catch((err) => console.log(err));
      }
   }, []);

   const handleResponse = (data) => {
      if (!data.includes("http")) {
         data = JSON.parse(data);
      }
      if (!data.message) {
         setMessage(`URL Created: ${data}`);
         setUrl("");
      } else {
         setMessage(data.message);
      }
      setShortUrl("");
   };

   useEffect(() => {
      toggleCustomUrl
         ? setButtonText("Remove Custom URL")
         : setButtonText("Add Custom URL");
   }, [toggleCustomUrl]);

   const createURL = () => {
      const request = {
         url,
         shortenedUrl: shortUrl,
      };
      fetch(
         token
            ? "http://localhost:3000/url/usercreate"
            : "http://localhost:3000/url/create",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: token ? `Bearer ${token}` : "NoAuth",
            },
            body: JSON.stringify(request),
         }
      )
         .then((response) => {
            return response.text();
         })
         .then((data) => handleResponse(data));
   };

   return (
      <>
         <nav className="nav-bar"></nav>
         <div className="title flex-center">URL Shortener</div>
         <div className="container flex-center">
            <div id="message">{message}</div>
            <div id="url-field" className="flex-center input-field">
               <label html="url">Enter URL</label>
               <input
                  type="url"
                  name="url"
                  id="url"
                  value={url}
                  autoComplete="url"
                  spellCheck="false"
                  onChange={(e) => setUrl(e.target.value)}
               />
            </div>
            {toggleCustomUrl && (
               <div id="custom-url-field" className="flex-center input-field">
                  <label htmlFor="url">
                     Enter custom URL (After localhost:3000/url/)
                  </label>
                  <input
                     type="text"
                     name="short-url"
                     id="short-url"
                     value={shortUrl}
                     spellCheck="false"
                     onChange={(e) => setShortUrl(e.target.value)}
                  />
               </div>
            )}
            <br />
            <button
               type="button"
               id="toggle-custom-url"
               onClick={function () {
                  setToggleCustomUrl((x) => !x);
               }}
            >
               {buttonText}
            </button>
            <button type="button" onClick={createURL}>
               Create
            </button>
         </div>
         {user ? (
            <div>
               View <Link to="/dashboard">Dashboard</Link>
            </div>
         ) : (
            <div>
               <Link to="/login">Login</Link> or{" "}
               <Link to="/signup">Sign Up</Link> to track URLs
            </div>
         )}
      </>
   );
};

export default Home;
