import * as yup from "yup";

// messages
const requiredMessage = "This Field is Required";
const minMessage = (min: number) => `at least use ${min} characters`;
const emailMessage = "Enter a Valid Email";
const matchMessage = "Confirm Password is not Match with Password";

// fields
const first_name = yup.string().required(requiredMessage).min(3, minMessage(3));
const last_name = yup.string().required(requiredMessage).min(3, minMessage(3));
const email = yup.string().email(emailMessage).required(requiredMessage);
const password = yup.string().required(requiredMessage).min(5, minMessage(5));
const password2 = yup
    .string()
    .required(requiredMessage)
    .min(5, minMessage(5))
    .oneOf([yup.ref("password")], matchMessage);

// schemas
export const signUpSchema = yup.object({
    first_name,
    last_name,
    email,
    password,
    password2,
});

export const loginSchema = yup.object({
    email,
    password,
});
