import { FC, useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout, userData } from "../services/auth.service";
import alarmSfx from "../audio/psycho-sound-11797.mp3";

const Navigation: FC = () => {
  const initValues = {
    userID: "",
    alias: "",
    phone: "",
    email: "",
    role: null,
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initValues);
  const alarm = useRef(new Audio(alarmSfx));
  const [alarmActive, setAlarmActive] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const getUser = async () => {
    const currentUser = await userData();
    setUser(currentUser);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const playAlarm = () => {
    setAlarmActive(!alarmActive);
    if (alarmActive) {
      alarm.current.pause();
    } else {
      alarm.current.play();
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="d-flex m-3">
      <nav className={openNav ? "overlay w-100" : "overlay w-0"}>
        <a className="closebtn" onClick={toggleNav}>
          &times;
        </a>
        <div className="overlay-content d-flex flex-column">
          <ul className="list-group">
            <li>
              <Link to="/start">Hem</Link>
            </li>
            <li>
              <Link to="/sok">Sök användare</Link>
            </li>
            <li>
              <Link to={`/community?username=${user.alias}&room=chat`}>
                Community
              </Link>
            </li>
            {user.role === "2" || user.role === 2 ? (
              <li>
                <Link to="/adminboard">Admin-board</Link>
              </li>
            ) : null}
            {user.role === "1" || user.role === 1 ? (
              <li>
                <Link to="/moderatorboard">Moderator-board</Link>
              </li>
            ) : null}
            <li>
              <Link to="tel:" className="mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-telephone-fill text-warning"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>{" "}
                112
              </Link>
            </li>
            <li>
              <Link to="#" onClick={playAlarm}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-megaphone-fill text-warning"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
                </svg>{" "}
                Larm
              </Link>
            </li>
            <li>
              <Link to="#" className="mt-5" onClick={handleLogout}>
                Logga ut
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <span className="h1 menubtn" onClick={toggleNav}>
        &#9776;
      </span>
    </header>
  );
};
export default Navigation;
