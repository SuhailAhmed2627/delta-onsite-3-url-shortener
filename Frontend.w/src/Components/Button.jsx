import React from "react";

const Button = ({ size, onClick, children }) => {
   return (
      <button
         className={"button" + (size == "small" ? " small" : "")}
         onClick={onClick}
         onAbort={onClick}
      >
         {children}
      </button>
   );
};

export default Button;
