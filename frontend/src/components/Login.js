import React, { useState, useEffect} from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useLocalState } from '../util/useLocalStroge';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest (){

        const reqBody = {
            username: username,
            password: password
        }

        axios.post("/api/auth/login", reqBody, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response =>{
            setJwt(response.headers.authorization);
            console.log(jwt);
            console.log(response.data);
            window.location.href = "/cart";
        })
        .catch(err =>{
            alert("Invalid username or password");
        })
    }

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md="8" lg="6">
            <Form.Group className="mb-3 text-center" controlId="username">
              <Form.Label className="fs-4">Email</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3 text-center" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-end">
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={sendLoginRequest}
            >
              Login
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
        <div className='text-center mt-3'>
        <a href="/register" className="link-primary">Create new account</a>
        </div>
      </Container>
    </>
  )
}

export default Login