import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const initValues = {
    firstName: "",
    lastName: "",
    alias: "",
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Obligatoriskt fält"),
    lastName: Yup.string().required("Obligatoriskt fält"),
    alias: Yup.string().required("Obligatoriskt fält"),
    phone: Yup.string()
      .required("Obligatoriskt fält")
      .min(10, "Inte ett giltigt telefonnummer"),
    email: Yup.string().email().required("Obligatoriskt fält"),
    password: Yup.string()
      .required("Obligatoriskt fält")
      .min(8, "Lösenordet behöver vara minst 8 tecken"),
    confirmPass: Yup.string()
      .required("Obligatoriskt fält")
      .oneOf([Yup.ref("password")], "Lösenoret matchar inte"),
  });

  return (
    <Formik
      initialValues={initValues}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const success = await register(values);
          if (success) {
            navigate("/login");
          } else {
            alert("There was an error when trying to register new user");
          }
        } catch (err) {
          alert(err);
        }
        setSubmitting(false);
      }}
      validationSchema={RegisterSchema}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;

        return (
          <div>
            <div className="wrapper m-3 p-3 mx-auto">
              <h2 className="mb-4">Registrera ny användare</h2>
              <Form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Förnamn
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className={
                      errors.firstName && touched.firstName
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Efternamn
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className={
                      errors.lastName && touched.lastName
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="alias" className="form-label">
                    Alias
                  </label>
                  <Field
                    type="text"
                    name="alias"
                    className={
                      errors.alias && touched.alias
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="alias"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Telefonnummer
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className={
                      errors.phone && touched.phone
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={
                      errors.email && touched.email
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Lösenord
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={
                      errors.password && touched.password
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPass" className="form-label">
                    Bekräfta lösenord
                  </label>
                  <Field
                    type="password"
                    name="confirmPass"
                    className={
                      errors.confirmPass && touched.confirmPass
                        ? "input-error form-control"
                        : "form-control"
                    }
                  />
                  <ErrorMessage
                    name="confirmPass"
                    component="span"
                    className="error"
                  />
                </div>

                <button
                  type="submit"
                  className={
                    !(dirty && isValid)
                      ? "btn btn-custom disabled-btn"
                      : "btn btn-custom"
                  }
                  disabled={!(dirty && isValid)}
                >
                  Registrera
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
export default RegisterPage;
