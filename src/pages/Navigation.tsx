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
    <nav className="navbar">
      <div>
        <ul>
          <li>
            <Link to="/start">Hem</Link>
          </li>
          <li>
            <Link to="/kontakter">Kontakter</Link>
          </li>
          <li>
            <Link to={`/community?username=${username}&room=chat`}>
              Community
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <a href="tel:">112</a>
          </li>
          <li>Larm</li>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;
