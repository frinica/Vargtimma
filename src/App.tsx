import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navigation from "./pages/Navigation";
import RegisterPage from "./pages/users/RegisterPage";

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
          {path != "/" && path != "/registrera" && path != "/login" ? (
            <div>
              <Navigation />
            </div>
          ) : null}

          <main className="appView">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/registrera" element={<RegisterPage />} />
              <Route path="/start" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
