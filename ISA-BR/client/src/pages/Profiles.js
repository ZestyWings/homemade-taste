import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME } from "../util/queries";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Profile.css";
import Stack from "react-bootstrap/Stack";

function Profile() {
  const params = useParams();
  console.log(params);

  const { loading, error, data } = useQuery(ME, {
    variables: params,
  });
  console.log(loading);
  console.log(data);
  if (error) {
    console.log(error);
  }

  const individual = data?.me || {};
  if (loading) {
    return <div> Loading...</div>;
  }
  console.log(params);

  return (
    <Container>
      <Row>
        <Col>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>

                <Card.Text>{individual.username}</Card.Text>
                <Card.Text>City: {individual.city}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Menu</Card.Title>

                <Card.Text>
                  Dish: {individual.dishType} <br></br>
                </Card.Text>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
