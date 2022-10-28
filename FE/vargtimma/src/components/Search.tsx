import { Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { userData } from "../services/auth.service";
import { insertReport } from "../services/report.service";
import { searchUser } from "../services/user.service";

const Search: FC = () => {
  const initValues = { id: "", alias: "", phone: "", email: "" };
  const initSearch = { search: "" };

  const [users, setUsers] = useState([initValues]);
  const [user, setUser] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

  const getUser = async () => {
    const currentUser = await userData();
    setUser(currentUser);
  };

  const sendReport = async (id: string) => {
    const reason = "Placeholder reason";
    await insertReport({ userID: id, reporterID: user.userID, reason });
  };

  useEffect(() => {
    getUser();
  }, []);

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
              <Button variant="custom" size="sm" className="usercard-button">
                +
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="usercard-button"
                onClick={() => {
                  sendReport(user.id);
                }}
              >
                Rapportera
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
export default Search;
