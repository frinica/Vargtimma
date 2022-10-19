import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userData } from "../services/auth.service";

const Navigation: FC = () => {
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const currentUsername = await userData();
    setUsername(currentUsername);
  };

  useEffect(() => {
    getUser();
  }, []);

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
              <Link to="">Logga ut</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Navigation;
