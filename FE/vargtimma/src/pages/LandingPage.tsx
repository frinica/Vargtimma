import { FC, useEffect, useState } from "react";
import { Button, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn, logout } from "../services/auth.service";

const LandingPage: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkLoggedIn = async () => {
    const loggedIn = checkIsLoggedIn();

    if (loggedIn) {
      navigate("/start");
    } else {
      logout();
      navigate("/");
      window.location.reload();
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (loading) {
      checkLoggedIn();
    }
  }, []);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="wrapper">
        <Figure>
          <Figure.Image
            alt="lantern with a burning candle inside"
            src="assets/img/lantern-logo.png"
            className="mt-3"
          />
        </Figure>
        <h1 className="mb-5 mt-2 fw-bold brand">VARGTIMMA</h1>

        <div className="d-grid gap-3 col-6 mx-auto py-5">
          <Button href="/login" variant="custom" size="lg">
            Logga in
          </Button>
          <Button href="/registrera" variant="custom" size="lg">
            Registrera
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
