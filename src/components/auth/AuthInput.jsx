import React from "react";

const AuthInput = ({ name, type, placeholder, register, errors, label }) => {
  return (
    <div className="mt-4 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className=" font-medium ml-1 text-sm tracking-wide">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full dark:bg-dark_bg_3 text-sm py-3 px-4 rounded-lg outline-none placeholder:font-light"
        placeholder={placeholder}
      />
      {errors && <p className="text-error ml-2 text-xs">{errors}</p>}
    </div>
  );
};

export default AuthInput;
