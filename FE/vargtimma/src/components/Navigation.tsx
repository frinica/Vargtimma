import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout, userData } from "../services/auth.service";

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

  const getUser = async () => {
    const currentUser = await userData();
    setUser(currentUser);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header>
      {/* Sidebar navigation */}
      <nav className="collapse d-lg-block sidebar collapse">
        <div className="position-sticky">
          <div>
            <ul className="list-group mx-3 mt-4">
              <li className="list-group-item py-2 ripple bgList">
                <Link to="/start">Hem</Link>
              </li>
              <li className="list-group-item py-2 ripple bgList">
                <Link to="/sok">Sök användare</Link>
              </li>
              <li className="list-group-item py-2 ripple bgList">
                <Link to={`/community?username=${user.alias}&room=chat`}>
                  Community
                </Link>
              </li>
              {user.role === "2" ? (
                <li className="list-group-item py-2 ripple bgList">
                  <Link to="/adminboard" className="">
                    Admin-board
                  </Link>
                </li>
              ) : null}
              {user.role === "1" ? (
                <li className="list-group-item py-2 ripple bgList">
                  <Link to="/moderatorboard" className="">
                    Moderator-board
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <ul className="list-group list-group-flush mx-3 mt-4">
              <li className="list-group-item py-2 ripple bgList">
                <a href="tel:">112</a>
              </li>
              <li className="list-group-item py-2 ripple bgList">Larm</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Topbar navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top customNav">
        <div className="container-fluid">
          <Link to="">
            <img></img>
          </Link>

          {/* Right side link */}
          <ul className="list-group-flush mx-2 mt-3">
            <li className="list-group-item">
              <Button variant="custom" size="sm" onClick={handleLogout}>
                Logga ut
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Navigation;
