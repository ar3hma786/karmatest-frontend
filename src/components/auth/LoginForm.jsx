import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Simulate a form submission. Replace this with actual API call if needed.
      // await api.login(values);
      
      // On successful login
      navigate("/admin");
    } catch (error) {
      // Handle errors if the API call fails
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faUserShield} className="text-white text-5xl" />
        </div>
        <h1 className="text-3xl text-white mb-6 text-center">
          Admin Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && <div className="text-red-500 text-sm mb-4">{errors.general}</div>}
              <div className="mb-5">
                <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 text-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 text-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black w-full hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Sign In
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
