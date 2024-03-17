import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorAlertMessage from '../../components/ErrorAlertMessage';


import axiosConfig from "../../lib/axiosConfig"
import { callToast,setValueLocalStorage } from "../../lib/functions"

import * as Yup from 'yup'
import { useWebsite } from '../../Context/Website';


const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email address'),
    password: Yup.string().required('Required').min(6)
})

const initialValues = {
    email: '',
    password: '',
}


function Login() {

    const {isLoggedInState, setIsLoggedInState, setUserInfo } = useWebsite();

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (values, { setErrors }) => {

        setIsSubmitting(true);

        await axiosConfig({
            method: "post",
            url: "login",
            data: values,
        })
            .then((response) => {
                setIsSubmitting(false);
                callToast('success', 'Your successfully login');

                localStorage.setItem("isLoggedIn", true);
				if(response.data && response.data.token){
                    setIsLoggedInState(true);
                    setUserInfo(response.data.user);
					setValueLocalStorage(response.data.token);
				}

                return navigate("/");
            })
            .catch((err) => {
                setIsSubmitting(false);

                let error = err.response.data
                if (error.error) {
                    callToast('error', error.error);
                }
                else if (error.errors) {
                    error.errors.map((err) => {
                        if (err.code == 'email') {
                            setErrors({ 'email': err.message });
                        }
                        else if (err.code == 'password') {
                            setErrors({ 'password': err.message });
                        }
                    });
                }
                else {
                    callToast('error', 'Invalid Credential');
                }
            });
    };

    if(isLoggedInState){
        return navigate("/");
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >

                    <Form className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                                <Field name="email"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="email"
                                    placeholder="Enter email"
                                    autoFocus
                                />
                                <ErrorMessage name="email">
                                    {(msg) => <ErrorAlertMessage>{msg}</ErrorAlertMessage>}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <Field type="password"
                                    name="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="password"
                                    placeholder="Enter password"
                                />
                                <ErrorMessage name="password">
                                    {(msg) => <ErrorAlertMessage>{msg}</ErrorAlertMessage>}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>
                    </Form>
                </Formik>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a user? {" "}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
