import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { QUERY_GET_LOCATIONS } from "../util/queries";
import { useQuery } from "@apollo/client";

const SearchedUsers = () => {
  const [searchInput, setSearchInput] = useState("");
  const {
    loading,
    error,
    data: searchedUsers,
    refetch,
  } = useQuery(QUERY_GET_LOCATIONS, {
    variables: { location: "" },
  });

  const handleFormSubmit = async (event) => {
    console.log("submit");
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      refetch({ location: searchInput });

      console.log(searchInput);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Location!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a location"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedUsers?.getUserLocation?.length
            ? `Viewing Location results:`
            : "Search for a location to begin"}
        </h2>
        <CardColumns>
          {!!searchedUsers?.getUserLocation?.length &&
            searchedUsers.getUserLocation.map((user) => {
              return (
                <Card key={user._id} border="dark">
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <p className="small">Bio: {user.bio}</p>
                  </Card.Body>
                </Card>
              );
            })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchedUsers;
