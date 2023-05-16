import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, MenuItem, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {FaRegEnvelope} from "react-icons/fa";
import {BsGenderAmbiguous} from "react-icons/bs";
import {MdLockOutline} from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useCallback, useState} from "react";
import {object, ref, string} from "yup";
import {RegisterFormFields} from "@/components/pages/register-page/components/register-form/types";
import {useRouter} from "next/router";
import {AuthApi} from "@/lib/api/auth/AuthApi";
import Swal from "sweetalert2";
import {FormikHelpers} from "formik/dist/types";
import withReactContent from "sweetalert2-react-content";

const genders = [
    {
        label: 'Male',
        value: 'male'
    },
    {
        label: 'Female',
        value: 'female'
    }
]

const RegisterForm = () => {
    const router = useRouter();
    const MySwal = withReactContent(Swal)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        gender: 'none',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = object().shape({
        firstName: string().required('Required'),
        lastName: string().required('Required'),
        email: string().email('Please enter a valid email').required('Required'),
        gender: string().oneOf(['male', 'female'], 'Required'),
        password: string().required('Required').min(8, 'Password must contain at least 8 characters'),
        confirmPassword: string().required('Required').oneOf([ref('password')], 'Password doesn\'t match'),
    })

    const handleSubmit = useCallback(
        async (data: RegisterFormFields, {setErrors}: FormikHelpers<RegisterFormFields>) => {
            try {
                await AuthApi.register(data)
                await MySwal.fire({
                    icon: 'success',
                    title: 'Your successfully registered',
                    showConfirmButton: false,
                    timer: 1500
                })
                await router.push("/login")
            } catch (e) {
                // @ts-ignore
                const message = e.response.data.detail;
                if (message == "User already exists") {
                    setErrors({
                        email: "Email already exists"
                    })
                    return;
                }
                await MySwal.fire({
                    icon: 'error',
                    title: 'Try again later',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        [router, MySwal]
    )

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form className="align-center flex justify-center">
                    <div className="w-80 flex flex-col items-center">
                        <div className="flex">
                            <Field
                                as={TextField}
                                error={props.touched.firstName && Boolean(props.errors.firstName)}
                                className="mb-2 flex w-1/2"
                                name="firstName"
                                placeholder="First Name"
                                helperText={<ErrorMessage name="firstName"/>}
                            />
                            <Field
                                as={TextField}
                                error={props.touched.lastName && Boolean(props.errors.lastName)}
                                className="mb-2 flex w-1/2"
                                name="lastName"
                                placeholder="Last Name"
                                helperText={<ErrorMessage name="lastName"/>}
                            />
                        </div>
                        <Field
                            as={TextField}
                            error={props.touched.email && Boolean(props.errors.email)}
                            className="mb-2 flex items-center"
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
                            select
                            error={props.touched.gender && Boolean(props.errors.gender)}
                            className="mb-2 flex items-center"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#22c55e"
                                    }
                                }
                            }}
                            fullWidth
                            name="gender"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BsGenderAmbiguous/>
                                    </InputAdornment>
                                )
                            }}
                            helperText={<ErrorMessage name="gender"/>}
                            defaultValue="none"
                        >
                            <MenuItem key="none" value="none" disabled><p className="text-left text-gray-400">Select
                                Gender</p></MenuItem>
                            {genders.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                        <Field
                            as={TextField}
                            error={props.touched.password && Boolean(props.errors.password)}
                            className="mb-2 flex items-center"
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
                        <Field
                            as={TextField}
                            error={props.touched.confirmPassword && Boolean(props.errors.confirmPassword)}
                            className="mb-4 flex items-center"
                            sx={{
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "#22c55e"
                                    }
                                }
                            }}
                            fullWidth
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
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
                            helperText={<ErrorMessage name="confirmPassword"/>}
                        />
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
                            Sign Up
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm;