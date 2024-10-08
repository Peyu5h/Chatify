import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../rtk/userSlice";
import SignInSchema from "../../utils/SignInSchema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AuthInput from "./AuthInput";

const Loginform = () => {
  const { status, error } = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const handleGuestLogin = async () => {
    if (guestLoader) return; 
    setGuestLoader(true);
    try {
      const res = await dispatch(loginUser({ email: "test-user1@gmail.com", password: "12345678" }));
      if (res.meta.requestStatus === 'fulfilled') {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Guest login error:", error);
    } finally {
      setGuestLoader(false);
    }
  }

  const onSubmit = async (data) => {
    if (status === 'loading') return;
    try {
      const res = await dispatch(loginUser({ ...data }));
      if (res.meta.requestStatus === 'fulfilled') {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="px-6 py-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="text-3xl font-bold">LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            errors={errors?.email?.message}
            label={"Email"}
          />

          <div className="flex relative items-center justify-center mt-4">
            <AuthInput
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              register={register}
              errors={errors?.password?.message}
              label={"Password"}
            />
            <div className="absolute right-5 top-[65%] transform text-lg">
              {showPass ? (
                <FaRegEye
                  onClick={() => setShowPass(!showPass)}
                  className="text-dark_svg_1 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPass(!showPass)}
                  className="text-dark_svg_1 cursor-pointer"
                />
              )}
            </div>
          </div>

          {error && (
            <p className="text-error ml-3 text-xs mt-2 mb-0">{error?.error}</p>
          )}
          <button
            className="mt-10 text-gray-100 w-full bg-blue_1 p-4 flex rounded-full justify-center font-semibold focus:outline-none hover:bg-blue_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <ScaleLoader color="#fff" width={3} height={18} />
            ) : (
              "Sign in"
            )}
          </button>
          <h1 className="text-white text-center my-2">or</h1>
          <button
            onClick={handleGuestLogin}
            className="text-gray-100 w-full bg-blue_1 p-4 flex rounded-full justify-center font-semibold focus:outline-none hover:bg-blue_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="button"
            disabled={guestLoader}
          >
            {guestLoader ? (
              <ScaleLoader color="#fff" width={3} height={18} />
            ) : (
              "Continue as Guest"
            )}
          </button>
          <p className="flex flex-row gap-x-2 items-center justify-center text-sm mt-6 text-center dark:text-dark_text_1">
            Don&apos;t have an account?
            <Link to="/register">
              <span className="text-blue_1 hover:underline transition-all ease-linear duration-200 cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginform;