import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendRegisterRequest() {
    const reqBody = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      username: username,
      password: password,
    };

    axios
      .post("/api/auth/register", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = "/login";
      })
      .catch((err) => {
        alert(
          "ERROR: This Email might be already taken or something wrong!" +
            "Please try to use a different email"
        );
      });
  }
  return (
    <div>
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
                <Form.Label className="text-secondary fs-4">
                  Last Name
                </Form.Label>
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
              <Form.Group className="mb-3 text-center" controlId="address">
                <Form.Label className="text-secondary fs-4">Address</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setAddress(e.target.value)}
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
                <Form.Label className="text-secondary fs-4">
                  Password
                </Form.Label>
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
                onClick={sendRegisterRequest}
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
          <div className="text-center mt-3">
            <a href="/login" className="link-primary">Login</a>
          </div>
        </Container>
        
      </>
    </div>
  );
};

export default Register;
