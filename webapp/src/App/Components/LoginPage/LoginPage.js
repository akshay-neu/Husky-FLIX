import React, { useState } from "react"; //use state is a hook for adding react state to components
import { withRouter } from "react-router-dom"; //connect component to router
import { loginUser } from "../../../Store/Actions/user_actions.js";
import { Formik } from 'formik'; // library for creating forms
import * as Yup from 'yup'; // for schema validation
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd'; // antd library components
import { useDispatch } from "react-redux"; // hook for returning dispatch function from redux store

const { Title } = Typography; //styling for text

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false; //retrieve value of rememberme key

  const [formErrorMessage, setFormErrorMessage] = useState('') // set initial state
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => { //handle event
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';  // return value of rememberme if it exists else return null

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      // Yup input validation 
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      // when input is submitted
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };
          // check if user credentials are correct
          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            {/* login button */}
            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} className="login-button">
          {/* email input */}
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" className="login-email" />}
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>
            {/* password input */}
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" className="login-email" />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              
              {formErrorMessage && (
                <label ><p className="error-msg">{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <a href="/reset_user" className="reset">
                  forgot password
                  </a>
                <div>
                  <Button type="primary" htmlType="submit" className="reset" disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


