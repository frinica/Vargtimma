import { FC } from "react";
import { Button } from "react-bootstrap";
const LandingPage: FC = () => {
  return (
    <div>
      <div className="wrapper mx-auto mt-5">
        <div>
          <img />
        </div>
        <h1 className="mt-4 mb-5">VARGTIMMA</h1>
        <div className="d-grid gap-3 col-6 mx-auto">
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
