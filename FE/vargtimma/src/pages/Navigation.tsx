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
    <nav className="collapse d-lg-block sidebar collapse">
      <div className="position-sticky">
        <div>
          <ul className="list-group list-group-flush mx-3 mt-4">
            <li className="list-group-item list-group-item-action py-2 ripple">
              <Link to="/start">Hem</Link>
            </li>
            <li className="list-group-item list-group-item-action py-2 ripple">
              <Link to="/kontakter">Kontakter</Link>
            </li>
            <li className="list-group-item list-group-item-action py-2 ripple">
              <Link to={`/community?username=${username}&room=chat`}>
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="list-group list-group-flush mx-3 mt-4">
            <li className="list-group-item list-group-item-action py-2 ripple">
              <a href="tel:">112</a>
            </li>
            <li className="list-group-item list-group-item-action py-2 ripple">
              Larm
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
