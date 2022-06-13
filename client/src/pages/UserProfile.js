import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import React from "react";
import { ME } from "../util/queries";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

function UserProfile() {
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

  const user = data?.me || {};
  if (loading) {
    return <div> Loading...</div>;
  }
  console.log(params);

  return (
    <Jumbotron fluid className="text-light bg-dark">
      <Container>
        <h1>Name: {user.username}</h1>
        <div>Phone: {user.phone} </div>
        <div>Bio: {user.bio} </div>
        <div>Location: {user.location} </div>
      </Container>
      <Container>
        <h1>Menu</h1>
        <div>{user.username}</div>
      </Container>
    </Jumbotron>
  );
}
export default UserProfile;
