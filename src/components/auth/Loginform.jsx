import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../rtk/userSlice";
import { useEffect, useState } from "react";
import SignInSchema from "../../utils/SignInSchema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Loginform = () => {
  const { status, error } = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);

  console.log(error?.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    setTimeout(() => {
      if (status == "success") navigate("/");
    }, 2000);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="  px-6 py-10 dark:bg-dark_bg_2 rounded-xl">
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
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
              register={register}
              errors={errors?.password?.message}
              label={"Password"}
            />
            <div className="absolute  right-5 top-[65%] transform  text-lg">
              {showPass ? (
                <FaRegEye
                  onClick={() => setShowPass(!showPass)}
                  className="text-dark_svg_1 cursor-pointer "
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
            className="  mt-10 text-gray-100 w-full bg-blue_1 p-4 flex rounded-full justify-center font-semibold focus:outline-none hover:bg-blue_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status == "loading" ? (
              <ScaleLoader color="#fff" width={3} height={18} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="flex flex-row gap-x-2 items-center justify-center text-sm mt-6 text-center dark:text-dark_text_1">
            Dont have an account?
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
