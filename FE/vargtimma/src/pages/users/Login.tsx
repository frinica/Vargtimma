import { FC } from "react";
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
          <div className="wrapper m-3 p-3 mx-auto">
            <h2 className="mb-4">Logga in</h2>
            <div className="mb-3">
              <Field
                type="text"
                name="email"
                placeholder="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="span" className="error" />
            </div>
            <div className="mb-3">
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
            </div>
            <button type="submit" className="btn btn-custom">
              Logga in
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export default LoginPage;
