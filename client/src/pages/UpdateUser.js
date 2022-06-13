import { ME } from "../util/queries";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Jumbotron, Container, Col, Form, Button } from "react-bootstrap";
import { useMenu, useUpdateUser } from "../util/getQueries";

const UserProfile = () => {
  const [inputPhone, setInputPhone] = useState("");
  const [inputBio, setInputBio] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [inputMenu, setInputMenu] = useState("");

  const { data: userProfile, refetch } = useQuery(ME, {
    onCompleted: ({ me }) => {
      setInputPhone(me?.phone || "");
      setInputBio(me?.bio || "");
      setInputLocation(me?.location || "");
    },
  });
  const updateUser = useUpdateUser();
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      updateUser({
        bio: inputBio,
        phone: inputPhone,
        location: inputLocation,
      });
      //   refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const { add, remove } = useMenu();

  const addMenuItem = async () => {
    await add(inputMenu);
    setInputMenu("");
    refetch();
  };
  const removeMenuItem = (_id) => {
    remove(_id);
    refetch();
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Contact Info!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  name="inputPhone"
                  value={inputPhone}
                  onChange={(e) => setInputPhone(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Enter Phone Number"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Label>Bio:</Form.Label>
                <Form.Control
                  name="inputBio"
                  value={inputBio}
                  onChange={(e) => setInputBio(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Tell Us About You!"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  name="inputLocation"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Enter Your Location"
                />
              </Col>
            </Form.Row>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" size="lg">
                Update!
              </Button>
            </Col>
          </Form>
        </Container>

        <Container>
          <h1>Menu Items!</h1>
          <Form>
            {!!userProfile?.me?.menus?.length &&
              userProfile.me.menus.map((menu, index) => {
                return (
                  <Form.Row key={index}>
                    <Col xs={8} md={4}>
                      <Form.Control
                        name="removeMenu"
                        readOnly={true}
                        value={menu.name}
                        type="text"
                        size="lg"
                      />
                    </Col>
                    <Col xs={4} md={2}>
                      <Button
                        variant="success"
                        size="lg"
                        onClick={() => removeMenuItem(menu._id)}
                      >
                        Remove!
                      </Button>
                    </Col>
                  </Form.Row>
                );
              })}
            <Form.Row>
              <Col xs={8} md={4}>
                <Form.Control
                  name="addMenu"
                  value={inputMenu}
                  onChange={(e) => setInputMenu(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Name your Item!"
                />
              </Col>
              <Col xs={4} md={2}>
                <Button variant="success" size="lg" onClick={addMenuItem}>
                  Add!
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default UserProfile;
