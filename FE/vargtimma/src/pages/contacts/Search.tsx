import { Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { searchUser } from "../../services/auth.service";

const SearchPage: FC = () => {
  const initValues = { alias: "", phone: "" };
  const [users, setUsers] = useState([{ alias: "", phone: "" }]);

  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={async (value, { setSubmitting }) => {
          const res = await searchUser(value);
          setUsers(res);
          setSubmitting(false);
        }}
      >
        <Form>
          <Field
            type="text"
            name="search"
            placeholder="Sök på alias eller telefonnummer"
            className="form-control"
          />
          <Button type="submit" variant="custom">
            Sök
          </Button>
        </Form>
      </Formik>

      {/* Search results */}
      {users.length > 0 ? (
        users.map((user, i) => {
          return (
            <div key={i} className="usercard col-lg-3">
              <img className="usercard-image" src="" />
              <h4 className="usercard-name">{user.alias}</h4>
              <Button variant="custom" className="usercard-button">
                +
              </Button>
            </div>
          );
        })
      ) : (
        <>
          <h4>Hittade inga resultat</h4>
        </>
      )}
    </>
  );
};
export default SearchPage;
