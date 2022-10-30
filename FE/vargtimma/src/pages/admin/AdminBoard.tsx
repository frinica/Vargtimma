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

const AdminPage: FC = () => {
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

  const updateUserRole = async (u: UpdatingUser, radioValue: number) => {
    const { alias, phone, email } = u;
    const user = {
      alias,
      phone,
      email,
      role: radioValue,
    };
    const success = await update(user);
    try {
      if (success) {
        alert("Användarens roll har uppdaterats");
      } else {
        alert("Användaren kunde inte uppdateras");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blockingUser = async (credentials: IBlacklist) => {
    const success = await blockUser(credentials);

    if (success === 200) {
      alert("Användarens uppgifter har blockerats");
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
                {reports ? (
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
                                phone: report.userData[0].phone,
                                email: report.userData[0].email,
                              });
                            }}
                          >
                            Blockera
                          </Button>
                          <Badge bg="danger" pill>
                            Ta bort
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <p>Inga rapporter</p>
                )}
              </ListGroup>
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
              <ListGroup as="ol">
                {users.map((u) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      variant="dark"
                      className="d-flex justify-content-between align-items-start"
                      key={u.userID}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{u.alias}</div>
                        {u.email}
                      </div>
                      <Badge
                        bg="success"
                        pill
                        onClick={() => setUpdateUser(true)}
                      >
                        Uppdatera
                      </Badge>

                      <Badge bg="danger" pill>
                        Blockera
                      </Badge>
                      {updateUser ? (
                        <ButtonGroup className="mb-2">
                          <Button
                            variant="danger"
                            size="sm"
                            className="fw-bold"
                            onClick={() => setUpdateUser(false)}
                          >
                            X
                          </Button>
                          {radios.map((radio, i) => (
                            <ToggleButton
                              key={i}
                              id={`radio-${i}`}
                              type="radio"
                              variant="secondary"
                              name="radio"
                              value={radio.value}
                              checked={radio.value === user.role}
                              onChange={(e: any) => {
                                setRadioValue(e.target.value);
                              }}
                            >
                              {radio.name}
                            </ToggleButton>
                          ))}
                          <Button
                            variant="success"
                            size="sm"
                            className="fw-bold"
                            onClick={() => updateUserRole(u, radioValue)}
                          >
                            Go
                          </Button>
                        </ButtonGroup>
                      ) : null}
                    </ListGroup.Item>
                  );
                })}
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
export default AdminPage;
