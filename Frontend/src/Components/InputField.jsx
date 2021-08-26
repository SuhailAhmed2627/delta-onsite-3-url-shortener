import React from "react";

const InputField = ({
   name,
   value,
   setValue,
   label,
   placeHolder,
   maxLength,
   type,
}) => {
   return (
      <div className="input-field">
         <label htmlFor={name}>{label}</label>
         <input
            value={value}
            type={type}
            maxLength={maxLength}
            placeholder={placeHolder}
            onChange={(e) => setValue(e.target.value)}
         />
      </div>
   );
};

export default InputField;
