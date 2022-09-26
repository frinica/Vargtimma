import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation: FC = () => {
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
            <Link to="/community">Community</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>112</li>
          <li>Larm</li>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;
