import React, { useState, useEffect } from "react";

const Dashboard = () => {
   const token = localStorage.getItem("token") || undefined;
   const [user, setUser] = useState(undefined);
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
   return (
      <div>
         {user ? (
            <div className="dashcoard-container">Not Loading</div>
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
};

export default Dashboard;
