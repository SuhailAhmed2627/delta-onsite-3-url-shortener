const checkPasswordStrength = (password) => {
   let strongPassword = new RegExp(
      "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
      "g"
   );
   let mediumPassword = new RegExp(
      "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
      "g"
   );
   let validPassword = new RegExp("(?=.{7,}).*", "g");

   if (strongPassword.test(password)) {
      return { value: "Password is Strong", color: "success" };
   } else if (mediumPassword.test(password)) {
      return { value: "Password is Medium", color: "success" };
   } else if (validPassword.test(password)) {
      return { value: "Password is Weak", color: "warning" };
   }
   return { value: "Password is Invalid", color: "error" };
};

export default checkPasswordStrength;
