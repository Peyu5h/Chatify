import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../rtk/userSlice";
import { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Registerform = () => {
  const { status, error } = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_SEC = import.meta.env.VITE_CLOUDINARY_SEC;
  const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    let res;
    const uploadImg = async () => {
      try {
        const formData = new FormData();
        formData.append("upload_preset", CLOUDINARY_SEC);
        formData.append("file", selectedFile);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        const url = data.secure_url;

        return url;
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image:", error);
        throw error;
      }
    };

    if (selectedFile !== null) {
      await uploadImg().then(async (url) => {
        res = dispatch(registerUser({ ...data, picture: url }));
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 5) {
      alert("File size should be less than 5MB");
      return;
    }
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);
    } else {
      alert("Invalid file type. Please select a jpg, jpeg, png, or webp file.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className=" max-w-md px-10 pt-5 pb-7 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="h-24 w-24 mx-auto relative group">
            <input
              type="file"
              ref={fileInputRef}
              style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
              onChange={handleFileInputChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <div
              className="h-24 w-24 hidden group-hover:block text-white transition-all ease-out duration-300  group-hover:bg-black/60 cursor-pointer pt-6 text-center absolute rounded-full text-sm px-2"
              style={{ zIndex: 1 }}
              onClick={handleImageClick}
            >
              <span>Click to </span>
              <span>Upload</span>
            </div>
            {selectedFile ? (
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={URL.createObjectURL(selectedFile)}
                alt=""
              />
            ) : (
              <img
                className="h-24 w-24 absolute rounded-full object-cover"
                src="https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
                alt=""
              />
            )}
          </div>
          <AuthInput
            name="name"
            type="text"
            placeholder="Enter your name"
            register={register}
            errors={errors?.name?.message}
            label={"Name"}
          />

          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            errors={errors?.email?.message}
            label={"Email"}
          />

          <AuthInput
            name="status"
            type="text"
            placeholder="What's in your mind? (optional)"
            register={register}
            errors={errors?.status?.message}
            label={"Status"}
          />
          <div className="flex relative items-center justify-center">
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
            className="mt-6 text-gray-100 w-full bg-blue_1 p-4 flex rounded-full justify-center font-medium focus:outline-none hover:bg-blue_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {loading ? (
              <ScaleLoader color="#fff" width={3} height={18} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="flex flex-row gap-x-2 items-center justify-center text-sm mt-4 text-center dark:text-dark_text_1">
            Already have an account?
            <Link to="/login">
              <span className="text-blue_1 hover:underline transition-all ease-linear duration-200 cursor-pointer">
                Sign in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registerform;
