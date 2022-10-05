import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterPage: FC = () => {
  const initValues = {
    firstName: "",
    lastName: "",
    alias: "",
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  // Phone number validation
  const phoneRegex =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Obligatoriskt fält"),
    lastName: Yup.string().required("Obligatoriskt fält"),
    alias: Yup.string().required("Obligatoriskt fält"),
    phone: Yup.string()
      .matches(phoneRegex, "Ogiltigt telefonnummer")
      .required("Obligatoriskt fält"),
    email: Yup.string().email().required("Obligatoriskt fält"),
    password: Yup.string()
      .required("Obligatoriskt fält")
      .min(8, "Lösenordet behöver vara minst 8 tecken"),
    confirmPass: Yup.string()
      .required("Obligatoriskt fält")
      .oneOf([Yup.ref("password")], "Lösenoret matchar inte"),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;

        return (
          <div className="container">
            <h2>Registrera ny användare</h2>
            <Form>
              <div>
                <label htmlFor="firstName">Förnamn</label>
                <Field
                  type="text"
                  name="firstName"
                  className={
                    errors.firstName && touched.firstName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor="lastName">Efternamn</label>
                <Field
                  type="text"
                  name="lastName"
                  className={
                    errors.lastName && touched.lastName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor="alias">Alias</label>
                <Field
                  type="text"
                  name="alias"
                  className={errors.alias && touched.alias ? "input-error" : ""}
                />
                <ErrorMessage name="alias" component="span" className="error" />
              </div>

              <div>
                <label htmlFor="phone">Telefonnummer</label>
                <input
                  type="text"
                  name="phone"
                  className={errors.phone && touched.phone ? "input-error" : ""}
                />
                <ErrorMessage name="phone" component="span" className="error" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div>
                <label htmlFor="password">Lösenord</label>
                <Field
                  type="password"
                  name="password"
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor="confirmPass">Bekräfta lösenord</label>
                <Field
                  type="password"
                  name="confirmPass"
                  className={
                    errors.confirmPass && touched.confirmPass
                      ? "input-error"
                      : ""
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
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Registrera
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default RegisterPage;
