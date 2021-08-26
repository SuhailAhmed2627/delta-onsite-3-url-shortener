import React, { useState, useEffect } from "react";
import "../../Assets/CSS/dashboard.css";
const Dashboard = () => {
   const token = localStorage.getItem("token") || undefined;
   const [user, setUser] = useState(undefined);
   const [urls, setUrls] = useState([]);

   const logout = () => {
      localStorage.clear();
      window.location.href = "http://localhost:8080";
   };

   const getUrlList = (urls) => {
      urls = urls.map((url) => {
         let date = new Date(url.expireAt);
         date = date.toUTCString();
         return (
            <details key={url._id}>
               <summary name="url._id" id="url._id">
                  {url.shortenedUrl}
               </summary>
               <p>
                  <b>Original URL:</b> {url.url}
               </p>
               <p>
                  <b>Total Visitors:</b> {url.count.count}
               </p>
               <p>Visitors from Asia: {url.count.asia}</p>
               <p>Visitors from N.America: {url.count.namerica}</p>
               <p>Visitors from S.America: {url.count.samerica}</p>
               <p>Visitors from Europe: {url.count.europe}</p>
               <p>Visitors from Australia: {url.count.australia}</p>
               <p>Visitors from Africa: {url.count.africa}</p>
               <p>Expires At {date}</p>
            </details>
         );
      });
      return urls;
   };
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

   useEffect(() => {
      if (user && user.urlIDs.length != 0) {
         fetch("http://localhost:3000/user/urls", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${token}`,
            },
         })
            .then((response) => response.json())
            .then((data) => {
               setUrls(getUrlList([...data]));
            })
            .catch((err) => console.log(err));
      }
   }, [user]);

   return (
      <div>
         {user ? (
            <div className="dashboard-container flex-center">
               <div className="dashboard-title flex-center">Dashboard</div>
               <div className="inner-container flex-center">
                  <p>Hello {user.userID}</p>
                  <br />
                  <button onClick={logout}>Logout</button>
                  <br />
                  <p className="sub-heading">Your URLs:</p>
                  <div className="urls-details-container">{urls}</div>
               </div>
            </div>
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
};

export default Dashboard;
