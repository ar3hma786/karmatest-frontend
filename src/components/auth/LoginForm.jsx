import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../state/authentication/Action'; // Update the import path if necessary
import './styles/LoginForm.css'; 

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsLoading(true);
      // Simulate a delay of 1 second before dispatching the login action and navigating
      setTimeout(() => {
        dispatch(login(values, navigate)); // Pass navigate to the login action creator
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
      setIsLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faUserShield} className="text-white text-5xl" />
        </div>
        <h1 className="text-3xl text-white mb-6 text-center">Admin Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <div className="text-red-500 text-sm mb-4">{errors.general}</div>}
              <div className="mb-5">
                <label htmlFor="username" className="block text-white text-sm font-medium mb-2">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 text-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 text-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 w-full hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex items-center justify-center"
                >
                  {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
