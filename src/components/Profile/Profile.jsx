import React, { useRef, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { MdDone, MdModeEditOutline, MdOutlineBlock } from "react-icons/md";
import { FaAngleRight, FaBookmark, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { changeProfile } from "../../rtk/userSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const CLOUDINARYSEC = import.meta.env.VITE_CLOUDINARY_SEC;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const userId = user._id;
  const token = user.token;

  const formik = useFormik({
    initialValues: {
      name: user.name,
      status: user.status,
      picture: user.picture,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name cannot be empty")
        .max(20, "Name is too long"),
      status: Yup.string()
        .required("Status cannot be empty")
        .max(179, "Status cannot be more than 180 characters"),
    }),

    onSubmit: async (values) => {
      const { name, status } = values;
      let data = { userId, token: token };

      try {
        if (selectedFile) {
          const url = await uploadImg();
          if (!url) return console.error("Error uploading image");

          if (name && status) {
            data = {
              userId: userId,
              name: name,
              status: status,
              picture: url,
              token: token,
            };
          } else if (name) {
            data = { userId: userId, name: name, picture: url, token: token };
          } else if (status) {
            data = {
              userId: userId,
              status: status,
              picture: url,
              token: token,
            };
          } else {
            data = { userId: userId, picture: url, token: token };
          }
        } else {
          if (name && status) {
            data = { userId: userId, name: name, status: status, token: token };
          } else if (name) {
            data = { userId: userId, name: name, token: token };
          } else if (status) {
            data = { userId: userId, status: status, token: token };
          }
        }

        const response = await dispatch(changeProfile(data));
        console.log(response);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("upload_preset", CLOUDINARYSEC);
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkysrpdi6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const url = data.secure_url;
      console.log(url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
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
    <div className="border-r-2 border-r-dark_bg_2">
      <Header />
      <div className="container flex flex-col">
        <div className="info flex flex-col justify-center items-center gap-y-3 bg-dark_bg_3 p-8">
          <div className="h-24 w-24 mx-auto relative group">
            <input
              type="file"
              ref={fileInputRef}
              style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
              onChange={handleFileInputChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <div
              className="h-24 w-24 hidden group-hover:block text-white transition-all ease-out duration-300   group-hover:bg-black/60 cursor-pointer pt-6 text-center absolute rounded-full text-sm px-2"
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
                src={user.picture}
                alt=""
              />
            )}
          </div>

          <div className="details mt-4 text-center flex flex-col gap-y-1">
            <h1 className="text-2xl font-light">{user.name}</h1>
            <h1 className="text-sm font-light text-dark_text_3">
              {user.email}
            </h1>
          </div>
        </div>

        <div className="info flex flex-col  items-start gap-y-1 bg-dark_bg_3 px-8 py-6 mt-4">
          <div className="text-md font-normal text-dark_text_3">About</div>
          <div className="text-md font-normal text-dark_text_1">
            {user.status}
          </div>
        </div>

        <div className="info flex flex-col  items-start gap-y-1 text-dark_text_2 bg-dark_bg_3 mt-4">
          <div className=" flex gap-x-2 items-center justify-between px-8 py-4 cursor-pointer w-full">
            <div className="flex gap-x-2 items-center">
              <h1>Edit Profile</h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="info flex flex-col  items-start gap-y-1  bg-dark_bg_3 mt-0 border-t-[3px] border-t-dark_bg_2">
            <div className=" flex flex-col gap-y-1   px-8 py-4 cursor-pointer  w-full">
              <label className="text-sm text-dark_text_2" htmlFor="name">
                Your name
              </label>
              <div className="w-full flex gap-x-0 items-center">
                <input
                  className="p-2 px-3 rounded-l-lg bg-dark_bg_4 outline-none border-1 placeholder:text-dark_hover_1 border-dark_border_1 text-dark_text_1 w-full"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  placeholder={user.name}
                />
                <button
                  type="submit"
                  className={`p-2 px-3 rounded-r-lg bg-dark_bg_4`}
                >
                  <MdDone
                    className={`text-2xl  ${
                      user.name != values.name && values.name != ""
                        ? "text-blue_1 "
                        : " text-dark_text_3/50"
                    } `}
                  />
                </button>
              </div>
              {errors.name && touched.name ? (
                <h1 className="text-xs ml-2 text-rose-500">{errors.name}</h1>
              ) : null}
            </div>

            <div className=" flex flex-col gap-y-1   px-8 py-4 cursor-pointer  w-full">
              <label
                className="text-sm text-dark_text_2 flex justify-between mr-14"
                htmlFor="name"
              >
                Your status &nbsp;{" "}
                {errors.status && touched.status ? (
                  <h1 className="mt-1 text-xs ml-2 text-rose-500">
                    {errors.status}
                  </h1>
                ) : null}
              </label>
              <div className="w-full flex gap-x-3 items-center">
                <textarea
                  rows={3}
                  maxLength={180}
                  className="p-2 px-3 max-h-[98px] min-h-[42px] scrollbar rounded-lg bg-dark_bg_4 outline-none border-1 border-dark_border_1 placeholder:text-dark_hover_1 text-dark_text_1 w-full"
                  type="text"
                  id="name"
                  onChange={handleChange}
                  value={values.status}
                  onBlur={handleBlur}
                  name="status"
                  placeholder={user.status}
                />
                <button
                  type="submit"
                  className={`p-2 rounded-full  ${
                    (user.status != values.status && values.status != "") ||
                    selectedFile
                      ? "bg-blue_1 "
                      : "bg-dark_scrollbar"
                  } `}
                >
                  <MdDone
                    className={`text-2xl     ${
                      (user.status != values.status && values.status != "") ||
                      selectedFile
                        ? " text-white "
                        : "text-dark_text_3/50"
                    } `}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
