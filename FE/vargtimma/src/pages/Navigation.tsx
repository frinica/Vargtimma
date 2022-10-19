import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, userData } from "../services/auth.service";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const currentUsername = await userData();
    setUsername(currentUsername);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };
  return (
    <header>
      {/* Sidebar navigation */}
      <nav className="collapse d-lg-block sidebar collapse bg-black">
        <div className="position-sticky">
          <div>
            <ul className="list-group list-group-flush mx-3 mt-4">
              <li className="list-group-item list-group-item-action py-2 ripple bg-black">
                <Link to="/start">Hem</Link>
              </li>
              <li className="list-group-item list-group-item-action py-2 ripple bg-black">
                <Link to="/kontakter">Kontakter</Link>
              </li>
              <li className="list-group-item list-group-item-action py-2 ripple bg-black">
                <Link to={`/community?username=${username}&room=chat`}>
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-group list-group-flush mx-3 mt-4">
              <li className="list-group-item list-group-item-action py-2 ripple bg-black">
                <a href="tel:">112</a>
              </li>
              <li className="list-group-item list-group-item-action py-2 ripple bg-black">
                Larm
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Topbar navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
        <div className="container-fluid">
          <Link to="">
            <img></img>
          </Link>

          {/* Right side links */}
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
