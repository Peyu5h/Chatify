import React from "react";
import Registerform from "../components/auth/Registerform";

const Register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="flex mx-auto h-full">
        <Registerform />
      </div>
    </div>
  );
};

export default Register;
