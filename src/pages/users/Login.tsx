import { FC, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const initValues = { email: "", password: "" };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await login(values);
          try {
            if (success) {
              navigate("/start");
              window.location.reload();
            } else {
              alert("Error when trying to login");
            }
          } catch (err) {
            alert(err);
          }
          setSubmitting(false);
        }}
        validationSchema={LoginSchema}
      >
        <Form>
          <Field type="text" name="email" placeholder="email" />
          <ErrorMessage name="email" component="span" className="error" />
          <Field type="password" name="password" placeholder="password" />
          <ErrorMessage name="password" component="span" className="error" />
          <button type="submit">Logga in</button>
        </Form>
      </Formik>
    </>
  );
};
export default LoginPage;
