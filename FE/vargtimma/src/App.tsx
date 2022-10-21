import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CommunityChat from "./pages/community/CommunityChat";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./pages/Navigation";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import ContactsPage from "./pages/contacts/Contacts";
import SearchPage from "./pages/contacts/Search";
import AdminPage from "./pages/admin/AdminBoard";

const App = () => {
  const path = window.location.pathname;

  return (
    <div className="App">
      <Router>
        {/* <header>
          {path === "/" ||
          path === "/registrera" ||
          path === "/login" ? null : (
            <h1>
              <Link to="/start">VARGTIMMA</Link>
            </h1>
          )}
        </header> */}

        {path !== "/" && path !== "/registrera" && path !== "/login" ? (
          <div>
            <Navigation />
          </div>
        ) : null}
        <main className="appContent">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registrera" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/start" element={<HomePage />} />
            <Route path="/community" element={<CommunityChat />} />
            <Route path="/adminboard" element={<AdminPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
