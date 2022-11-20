import { FC, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Collapse,
  Form,
  ListGroup,
  ToggleButton,
} from "react-bootstrap";
import Search from "../../components/Search";
import { IBlacklist, IReport } from "../../models/Report";
import { userData } from "../../services/auth.service";
import {
  blockUser,
  deleteReport,
  fetchReports,
} from "../../services/report.service";
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
  const [index, setIndex] = useState<number | null>(null);
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

  const blockingUser = async (blockData: any) => {
    const success = await blockUser(blockData);

    if (success === 200) {
      alert("Användarens uppgifter har blockerats");
      window.location.reload();
    } else {
      alert("Användaren kunde inte blockeras");
    }
  };

  const removeReport = async (id: string) => {
    const success = await deleteReport(id);

    if (success === 200) {
      alert("Rapporten har tagits bort");
      window.location.reload();
    } else {
      alert("Ett fel uppstod");
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
      <div>
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
            <div className="text-start mt-2">
              <ListGroup as="ol">
                {reports.length > 0 ? (
                  reports.map((report: any, i: number) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        variant="dark"
                        className="d-flex align-items-start overflow-scroll"
                        key={i}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {report.userData[0].email}
                          </div>
                          <p>Rapporterad av: {report.reporterData[0].alias}</p>
                        </div>
                        <div className="mx-5">
                          <p>Anledning:</p>
                          <p>{report.reason}</p>
                        </div>
                        <div className="d-flex">
                          <ButtonGroup className="mb-2">
                            <Button
                              variant="danger"
                              size="sm"
                              className="rounded-pill mx-2"
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
                              onClick={() => {
                                removeReport(report._id);
                              }}
                            >
                              Radera
                            </Button>
                          </ButtonGroup>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <p className="text-center">🌟Inga rapporter🌟</p>
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
                {users.map((u, i) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      variant="dark"
                      className="d-flex align-items-start overflow-scroll"
                      key={u.userID}
                    >
                      <div className="text-start me-5">
                        <p className="fw-bold  mb-0">{u.alias}</p>
                        <p className="mb-0">{u.email}</p>
                      </div>
                      <div>
                        <div className="d-flex">
                          <ButtonGroup className="mb-2">
                            <Button
                              variant="success"
                              size="sm"
                              className="rounded-pill me-2"
                              onClick={() => {
                                setUpdateUser(true);
                                setIndex(i);
                              }}
                            >
                              Uppdatera
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="rounded-pill"
                            >
                              Blockera
                            </Button>
                          </ButtonGroup>
                        </div>

                        {updateUser && index === i ? (
                          <div className="text-start mt-2">
                            <ButtonGroup className="mb-2">
                              <Button
                                variant="danger"
                                size="sm"
                                className="fw-bold"
                                onClick={() => setUpdateUser(false)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fillRule="inherit"
                                  className="bi bi-x-lg"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                              </Button>
                              <Form className="d-flex mx-2">
                                {radios.map((radio, i) => (
                                  <Form.Check
                                    inline
                                    key={i}
                                    label={radio.name}
                                    type="radio"
                                    id={`radio-${i}`}
                                    checked={radio.value == u.role}
                                    onChange={(e: any) => {
                                      setRadioValue(e.target.value);
                                    }}
                                  />
                                ))}
                                <Button
                                  variant="success"
                                  size="sm"
                                  className="fw-bold"
                                  onClick={() => updateUserRole(u, radioValue)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fillRule="inherit"
                                    className="bi bi-check-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                  </svg>
                                </Button>
                              </Form>
                            </ButtonGroup>
                          </div>
                        ) : null}
                      </div>
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
