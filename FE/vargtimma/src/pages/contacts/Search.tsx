import { Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { searchUser } from "../../services/auth.service";

const SearchPage: FC = () => {
  const initValues = { alias: "", phone: "" };
  const initSearch = { search: "" };

  const [users, setUsers] = useState([initValues]);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Formik
        initialValues={initSearch}
        onSubmit={async (value, { setSubmitting }) => {
          const res = await searchUser(value);
          setUsers(res);
          setIsChecked(true);
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
      {isChecked ? (
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
