import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import authService from "../services/auth.service";
import '../styles/Login.css'
const Login = () => {
  const nav = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(undefined);

  const initialValues = {
    email: "",
    password: "",
  };

  //Validations:
  const validationSchema = Yup.object({
    email: Yup.string().min(2).required(),
    password: Yup.string().min(4).required(),
  });

  //will be called by formik if the form is VALID
  const handleLogin = (formValues) => {
    setisLoading(true);
    //get data from input fields:
    const { email, password } = formValues;

    //submit Post request
    authService
      .login(email, password)
      .then((res) => {
        //save the JWT for next time:
        login(email, res.token);
        //Go to Home page:
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        if(e.code === "ERR_NETWORK"){
          seterrorMessage("Please check the server is up and running");
        }else
        seterrorMessage(JSON.stringify(e));
      })
      .finally(() => {
        setisLoading(false);
        //seterrorMessage(undefined)
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
    >
      <Form>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {isLoading && <Spinner text="Logging you in..." />}
        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="email" className="form-label">
            Email:&nbsp;
          </label>
          {/* Input Tag */}
          <Field name="email" type="text" id="email" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="email"
            className="alert alert-danger"
          />
        </div>

        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="password" className="form-label">
            Password:&nbsp;
          </label>
          {/* Input Tag */}
          <Field name="password" type="password" id="password" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="password"
            className="alert alert-danger"
          />
        </div>

        <div className="col-12">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary login"
          >
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;