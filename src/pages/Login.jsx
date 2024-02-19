import React from "react";
import Loginform from "../components/auth/Loginform";

const Login = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="flex mx-auto h-full">
        <Loginform />
      </div>
    </div>
  );
};

export default Login;
