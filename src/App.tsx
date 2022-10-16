import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import CommunityChat from "./pages/community/CommunityChat";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./pages/Navigation";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";

const App = () => {
  const path = window.location.pathname;

  return (
    <div className="App">
      <Router>
        <header>
          {path === "/" || path === "/registrera" || path === "/login" ? (
            <h1>VARGTIMMA</h1>
          ) : (
            <h1>
              <Link to="/start">VARGTIMMA</Link>
            </h1>
          )}
        </header>

        <div className="appContent">
          {path !== "/" && path !== "/registrera" && path !== "/login" ? (
            <div>
              <Navigation />
            </div>
          ) : null}

          <main className="appView">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/registrera" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/start" element={<HomePage />} />
              <Route path="/community" element={<CommunityChat />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
