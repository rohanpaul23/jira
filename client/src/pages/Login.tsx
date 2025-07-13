import React, { useState, FormEvent } from "react";
import { css } from "@emotion/react";
import * as Label from "@radix-ui/react-label";
import { Card, Text, Button } from "@radix-ui/themes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdLogIn } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCredentials } from "../store/reducers/authReducer";
import { fetchWorkspacesRequest, fetchWorkspacesSuccess } from "../store/reducers/workspaceReducer";


const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex:1
`;
const cardStyle = css`
  width: 400px;
`;
const innerStyle = css`
  padding: 1.5rem;
`;
const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;
const inputStyle = css`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const oauthButtonGroup = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login: React.FC = () => {

  const [t] = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (values) => {
    // e.preventDefault();
    const {email,password} = values
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      dispatch(setCredentials(data.userId, data.email, data.token));
      localStorage.setItem('token', data.token);
      navigate('/dashboard', { state: { from: location } });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div css={containerStyle}>
      <Card size="2" variant="surface" css={cardStyle}>
        <div css={innerStyle}>
          <Text as="h2" size="3" weight="bold">
           {t("landing.welcome")}
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => login(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form css={formStyle} onSubmit={handleSubmit}>
                <input
                  css={inputStyle}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                  css={inputStyle}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <Button type="submit" onClick={handleSubmit} size="2" variant="solid">
                  <IoMdLogIn style={{ marginRight: "0.5rem" }} />
                  {t("authentication.logIn")}
                </Button>
              </form>
            )}
          </Formik>
          <div css={oauthButtonGroup}>
            <Button onClick={() => handleOAuth("google")} size="2" variant="outline">
              <FcGoogle style={{ marginRight: "0.5rem" }} /> 
              <span css={css`color:black`}>{t("authentication.google")}</span>
            </Button>
            <Button css={css`color:black`} onClick={() => handleOAuth("github")} size="2" variant="outline">
              <FaGithub style={{ marginRight: "0.5rem" }} /> 
              <span>{t("authentication.github")}</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Login;
