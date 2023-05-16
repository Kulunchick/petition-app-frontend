import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {FaRegEnvelope} from "react-icons/fa";
import {MdLockOutline} from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from "react";
import {object, string} from "yup";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const LoginForm = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = object().shape({
        email: string().email('Please enter a valid email').required('Required'),
        password: string().required('Required'),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setErrors}) => {
                const status = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password
                })
                if (status?.ok) {
                    router.push("/")
                } else {
                    setErrors({
                        email: "Invalid email or password",
                        password: "Invalid email or password"
                    })
                }
            }}
        >
            {(props) => (
                <Form className="align-center" onSubmit={(event) => {
                    event.preventDefault();
                    props.handleSubmit()
                }}>
                    <div className="flex flex-col items-center">
                        <Field
                            as={TextField}
                            error={props.touched.email && Boolean(props.errors.email)}
                            className="mb-2 flex items-center md:w-72"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#22c55e"
                                    }
                                }
                            }}
                            fullWidth
                            name="email"
                            placeholder="Email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaRegEnvelope/>
                                    </InputAdornment>
                                ),
                            }}
                            helperText={<ErrorMessage name="email"/>}
                        />
                        <Field
                            as={TextField}
                            error={props.touched.password && Boolean(props.errors.password)}
                            className="mb-4 flex items-center md:w-72"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#22c55e"
                                    }
                                }
                            }}
                            fullWidth
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdLockOutline/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            helperText={<ErrorMessage name="password"/>}
                        />
                    </div>
                    <Button
                        sx={{
                            textTransform: "none",
                            borderColor: "#22c55e",
                            ":hover": {
                                border: 2,
                                backgroundColor: "#22c55e"
                            }
                        }}
                        variant="outlined"
                        className="border-2 text-center text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white hover:border-green-500"
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;