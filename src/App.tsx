import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import OnlineContacts from "./pages/contacts/Online";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <div>
            <ul>
              <li>
                <Link to="/">Hem</Link>
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

        <main className="appContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
