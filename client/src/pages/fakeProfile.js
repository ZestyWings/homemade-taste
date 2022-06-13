import React from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

function fakeProfile() {
  return (
    <Jumbotron fluid className="text-light bg-dark">
      <Container>
        <h1>Name: Zeth</h1>
        <div>Phone: 555-555-5555 </div>
        <div>Bio: I like to eat </div>
        <div>Location: San Diego </div>
      </Container>
      <Container>
        <h1>Menu</h1>
        <div> Zesty Wings </div>
      </Container>
    </Jumbotron>
  );
}

export default fakeProfile;
