import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .min(3, "Name must be at least 3 characters")
    .max(24, "Name must be at most 24 characters"),

  email: Yup.string().email("Invalid email").required("Email is required"),
  status: Yup.string().max(64, "Status must be at most 64 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be at most 24 characters"),
});

export default signUpSchema;
