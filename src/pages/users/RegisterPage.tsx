import { FC, useState } from "react";
import { IUser } from "../../models/User";

const RegisterPage: FC = () => {
  const [formData, setFormData] = useState<IUser>({
    firstName: "",
    lastName: "",
    alias: "",
    phone: null,
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      firstName: "",
      lastName: "",
      alias: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = formData;
  const Regex = RegExp(
    /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
  ); //Validate the email format

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let validity = true;
    // Register user only if there are no errors
    Object.values(formData.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity === true) {
      console.log("Able to register user");
    } else {
      console.log("Can't register user");
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    let errors = formData.errors;
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate inputs
    switch (name) {
      case "firstName":
        errors.firstName = value.length < 1 ? "Name is not valid" : "";
        break;
      case "lastName":
        errors.lastName = value.length < 1 ? "Name is not valid" : "";
        break;
      case "alias":
        errors.alias = value.length < 2 ? "Name is not valid" : "";
        break;
      case "phone":
        errors.phone =
          value.length < 9 ? "Phone number must be at least 9 digits" : "";
        break;
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be at least 8 characters" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value !== formData.password ? "Must be the same as password" : "";
        break;
      default:
        break;
    }
    // Assign error messages to formData
    setFormData(Object.assign(formData, { errors, [name]: value }));
  };

  return (
    <div className="formWrapper">
      <div className="registrationForm">
        <h2>Registrera användare</h2>
        <form onSubmit={handleSubmit}>
          <div className="nameSection">
            <label htmlFor="firstName">Förnamn</label>
            <input type="text" name="firstName" onChange={handleChange} />
            {errors.firstName.length > 0 && (
              <span style={{ color: "red" }}>{errors.firstName}</span>
            )}
            <label htmlFor="lastName">Efternamn</label>
            <input type="text" name="lastName" onChange={handleChange} />
            {errors.lastName.length > 0 && (
              <span style={{ color: "red" }}>{errors.lastName}</span>
            )}
          </div>
          <div className="alias">
            <label htmlFor="alias">Alias</label>
            <input type="text" name="alias" onChange={handleChange} />
            {errors.alias.length > 0 && (
              <span style={{ color: "red" }}>{errors.alias}</span>
            )}
          </div>
          <div className="phone">
            <label htmlFor="phone">Telefonnummer</label>
            <input type="text" name="phone" onChange={handleChange} />
            {errors.phone.length > 0 && (
              <span style={{ color: "red" }}>{errors.phone}</span>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange} />
            {errors.email.length > 0 && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div className="passwordSection">
            <label htmlFor="password">Lösenord</label>
            <input type="text" name="password" onChange={handleChange} />
            {errors.password.length > 0 && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}

            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
            <input type="text" name="confirmPassword" onChange={handleChange} />
            {errors.confirmPassword.length > 0 && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className="submit">
            <button>Registrera</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
