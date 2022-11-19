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
              <Link to="tel:">112</Link>
            </li>
            <li>
              <Link to="#" onClick={playAlarm}>
                Larm
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleLogout}>
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
