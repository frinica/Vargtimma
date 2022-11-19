import { FC, useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Collapse,
  ListGroup,
  ToggleButton,
} from "react-bootstrap";
import Search from "../../components/Search";
import { IBlacklist, IReport } from "../../models/Report";
import { userData } from "../../services/auth.service";
import { blockUser, fetchReports } from "../../services/report.service";
import { fetchUsers, update } from "../../services/user.service";

interface UpdatingUser {
  alias: string;
  phone: string;
  email: string;
}

const ModeratorPage: FC = () => {
  const initValues = {
    userID: "",
    alias: "",
    phone: "",
    email: "",
    role: 5,
  };
  const [user, setUser] = useState(initValues);
  const [active, setActive] = useState(0);
  const [users, setUsers] = useState([initValues]);
  const [reports, setReports] = useState<any[]>([]);
  const [updateUser, setUpdateUser] = useState(false);
  const [radioValue, setRadioValue] = useState(5);

  const radios = [
    { name: "Användare", value: 0 },
    { name: "Moderator", value: 1 },
    { name: "Administratör", value: 2 },
  ];

  const blockingUser = async (blockData: any) => {
    const success = await blockUser(blockData);

    if (success === 200) {
      alert("Användarens uppgifter har blockerats");
      window.location.reload();
    } else {
      alert("Användaren kunde inte blockeras");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await userData();
      setUser(currentUser);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    const getReports = async () => {
      const fetchedReports = await fetchReports();
      setReports(fetchedReports);
    };

    getUsers();
    getReports();
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
              <ListGroup as="ol">
                {reports.length !== 0 ? (
                  reports.map((report, i) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        variant="dark"
                        className="d-flex justify-content-between align-items-start"
                        key={i}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {report.userData[0].email}
                          </div>
                          <p>Rapporterad av: {report.reporterData[0].alias}</p>
                        </div>
                        <div>
                          <p>Anledning:</p>
                          <p>{report.reason}</p>
                        </div>
                        <div className="d-flex">
                          <Button
                            variant="danger"
                            size="sm"
                            className="mx-1"
                            onClick={() => {
                              blockingUser({
                                userID: report.userData[0]._id,
                                phone: report.userData[0].phone,
                                email: report.userData[0].email,
                                reportID: report._id,
                              });
                            }}
                          >
                            Blockera
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            className="rounded-pill"
                          >
                            Ta bort
                          </Button>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <p>🌟Inga rapporter🌟</p>
                )}
              </ListGroup>
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
              <Search />
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};
export default ModeratorPage;
