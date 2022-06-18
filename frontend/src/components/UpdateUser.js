import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function UpdateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateUser = (e) => {
    const reqBody = { username, password, firstName, lastName, email };

    if (id) {
      axios
        .put("/user/update/" + id, reqBody)
        .then((response) => {
          console.log(response.data);
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md="4" lg="3">
            <Form.Group className="mb-3 text-center" controlId="firstName">
              <Form.Label className="text-secondary fs-4 ">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                size="lg"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md="4" lg="3">
            <Form.Group className="mb-3 text-center" controlId="lastName">
              <Form.Label className="text-secondary fs-4">Last Name</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col md="8" lg="6">
            <Form.Group className="mb-3 text-center" controlId="username">
              <Form.Label className="text-secondary fs-4">Email</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3 text-center" controlId="password">
              <Form.Label className="text-secondary fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-end"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={updateUser}
            >
              Register
            </Button>
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => {
                window.location.href = "/";
              }}
              variant="secondary"
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateUser;
