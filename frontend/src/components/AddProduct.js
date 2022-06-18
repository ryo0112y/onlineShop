import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  function addProductToDatabase() {
    const reqBody = {
      name: name,
      description: description,
      price: price,
      imgUrl: imgUrl,
      category: category,
      stock: stock,
    };

    axios
      .post("/api/auth/add/product", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="text-secondary fs-4">
                  Product Name
                </Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center ">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="text-secondary fs-4">
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="price">
                <Form.Label className="text-secondary fs-4">Price</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="imgUrl">
                <Form.Label className="text-secondary fs-4">
                  Image URL
                </Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="category">
                <Form.Label className="text-secondary fs-4">
                  Category
                </Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>{" "}
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="stack">
                <Form.Label className="text-secondary fs-4">Stack of Products</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  onChange={(e) => setStock(e.target.value)}
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
                onClick={addProductToDatabase}
              >
                Add Product
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
    </div>
  );
};

export default AddProduct;
