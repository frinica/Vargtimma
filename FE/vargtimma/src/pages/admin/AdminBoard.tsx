import { FC, useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../../services/auth.service";

const AdminPage: FC = () => {
  const navigate = useNavigate();
  const initValues = {
    userID: "",
    alias: "",
    phone: "",
    email: "",
    role: null,
  };
  const [user, setUser] = useState(initValues);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await userData();
      setUser(currentUser);
    };
    getUser();
  }, []);

  return (
    <div className="d-flex flex-column">
      <h2>Hej {user.alias}!</h2>
      <div className="">
        <div className="flex-column p-3">
          <Button
            variant="custom"
            onClick={() => {
              if (active !== 1) {
                setActive(1);
              } else {
                setActive(0);
              }
            }}
          >
            Rapporterade användare
          </Button>
          <Collapse className="mt-3" in={active === 1}>
            <div>
              <p>John Doe</p>
            </div>
          </Collapse>
        </div>

        <div className="flex-column p-3">
          <Button
            variant="custom"
            onClick={() => {
              if (active !== 2) {
                setActive(2);
              } else {
                setActive(0);
              }
            }}
          >
            Alla användare
          </Button>
          <Collapse className="mt-3" in={active === 2}>
            <div>
              <p>Jane Doe</p>
              <p>Jane Doe</p>
              <p>Jane Doe</p>
              <p>John Doe</p>
              <p>John Doe</p>
            </div>
          </Collapse>
        </div>

        <div className="flex-column p-3">
          <Button
            variant="custom"
            onClick={() => {
              if (active !== 3) {
                setActive(3);
              } else {
                setActive(0);
              }
            }}
          >
            Sök användare
          </Button>
          <Collapse className="mt-3" in={active === 3}>
            <div>
              <p>Sök</p>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
