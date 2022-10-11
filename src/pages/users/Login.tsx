import { FC } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPage: FC = () => {
  const initValues = { email: "", password: "" };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });
  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
