import { FC } from "react";
import { Button, Figure } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
const LandingPage: FC = () => {
  return (
    <div>
      <div className="wrapper mx-auto mt-5">
        {/* <div>
          <img
            src="img/lantern-logo.png"
            alt="lantern with a burning candle inside"
            className="mt-3"
          />
        </div> */}
        <Figure>
          <Figure.Image
            alt="lantern with a burning candle inside"
            src="img/lantern-logo.png"
            className="mt-3 logo"
          />
        </Figure>
        <h1 className="mb-5 fw-bold">VARGTIMMA</h1>

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
