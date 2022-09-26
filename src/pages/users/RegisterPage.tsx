import { FC } from "react";
import { IUser } from "../../models/User";

const RegisterPage: FC = () => {
  const handleSubmit = (e: any) => {};
  const handleChange = (e: any) => {};

  return (
    <div className="formWrapper">
      <div className="registrationForm">
        <h2>Registrera användare</h2>
        <form onSubmit={handleSubmit}>
          <div className="nameSection">
            <label htmlFor="firstName">Förnamn</label>
            <input type="text" name="firstName" onChange={handleChange} />
            <label htmlFor="lastName">Efternamn</label>
            <input type="text" name="lastName" onChange={handleChange} />
          </div>
          <div className="alias">
            <label htmlFor="alias">Alias</label>
            <input type="text" name="alias" onChange={handleChange} />
          </div>
          <div className="phone">
            <label htmlFor="phone">Telefonnummer</label>
            <input type="text" name="phone" onChange={handleChange} />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange} />
          </div>
          <div className="passwordSection">
            <label htmlFor="password">Lösenord</label>
            <input type="text" name="password" onChange={handleChange} />
            <label htmlFor="confirmPassword">Bekräfta lösenord</label>
            <input type="text" name="confirmPassword" onChange={handleChange} />
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
