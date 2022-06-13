import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FIND_USER } from "../util/queries";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Profile.css";
import Stack from "react-bootstrap/Stack";

function ViewProfiles() {
  const params = useParams();
  console.log(params);

  const { loading, error, data } = useQuery(FIND_USER, {
    variables: params,
  });
  console.log(loading);
  console.log(data);
  if (error) {
    console.log(error);
  }

  const user = data?.findUser || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Card className="card">
              <Card.Body>
                <Card.Title>Profile</Card.Title>

                <Card.Text>{user.username}</Card.Text>
                <Card.Text>{user.city}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card">
              <Card.Body>
                <Card.Title>Menu</Card.Title>
                <Card.Text>
                  Dish: {user.dishType} <br></br>
                </Card.Text>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewProfiles;
