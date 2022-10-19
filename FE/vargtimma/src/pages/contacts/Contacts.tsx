import { FC } from "react";
import { Badge, ListGroup } from "react-bootstrap";

const ContactsPage: FC = () => {
  return (
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
  );
};
export default ContactsPage;
