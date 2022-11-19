import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CommunityChat from "./pages/community/CommunityChat";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import AdminPage from "./pages/admin/AdminBoard";
import ModeratorPage from "./pages/admin/ModeratorBoard";
import { useEffect, useState } from "react";
import { checkIsLoggedIn } from "./services/auth.service";
import Search from "./components/Search";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const loadLoginResource = async () => {
    const isLoggedIn = checkIsLoggedIn();

    if (isLoggedIn) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    loadLoginResource();
  });

  return (
    <div className="App">
      <Router>
        {loggedIn && <Navigation />}
        <main className="mx-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registrera" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/start" element={<HomePage />} />
            <Route path="/sok" element={<Search />} />
            <Route path="/community" element={<CommunityChat />} />
            <Route path="/adminboard" element={<AdminPage />} />
            <Route path="/moderatorboard" element={<ModeratorPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
