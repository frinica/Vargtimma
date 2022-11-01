import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CommunityChat from "./pages/community/CommunityChat";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import AdminPage from "./pages/admin/AdminBoard";

const App = () => {
  const path = window.location.pathname;

  return (
    <div className="App">
      <Router>
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
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
