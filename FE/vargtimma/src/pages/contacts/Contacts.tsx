import { FC } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContactsPage: FC = () => {
  const navigate = useNavigate();
  const newSearch = () => {
    navigate("/search");
  };

  return (
    <div>
      <Button variant="custom" className="m-3" onClick={newSearch}>
        Hitta användare
      </Button>

      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          variant="dark"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Jane Doe</div>
            Online/Offline
          </div>
          <Badge bg="success" pill>
            Ring
          </Badge>
          <Badge bg="success" pill className="mx-1">
            Chatt
          </Badge>
          <Badge bg="danger" pill>
            Radera
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          variant="dark"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">John Doe</div>
            Online/Offline
          </div>
          <Badge bg="success" pill>
            Ring
          </Badge>
          <Badge bg="success" pill className="mx-1">
            Chatt
          </Badge>
          <Badge bg="danger" pill>
            Radera
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          variant="dark"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Jane Doe</div>
            Online/Offline
          </div>
          <Badge bg="success" pill>
            Ring
          </Badge>
          <Badge bg="success" pill className="mx-1">
            Chatt
          </Badge>
          <Badge bg="danger" pill>
            Radera
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
export default ContactsPage;
