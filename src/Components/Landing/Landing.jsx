import React from "react";
import "./style.css";

import { Card, Col, Container, Row } from "react-bootstrap";
import { MdOutlinePriceCheck } from "react-icons/md";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineDataUsage } from "react-icons/md";

const Example = () => {
  return (
    <Container>
      <Row className="my-4" xs={1} sm={2} md={3} lg={3} xl={3}>
        {/* First Column: Card with Price Check Icon */}
        <Col className="text-center">
          <Card className="price-card">
            <Card.Body>
              <MdOutlinePriceCheck
                style={{ fontSize: "50px"}}
              />
              <br />
              <strong>Live Price Tracking</strong>
            </Card.Body>
          </Card>
        </Col>

        {/* Third Column: Will appear second (order: 0) */}
        <Col xs={{ order: 0 }} className="text-center">
          <Card className="price-card">
            <Card.Body>
            <MdOutlineDataUsage style={{ fontSize: "50px"}} />
            <br />
            UseCase</Card.Body>
          </Card>
        </Col>

        {/* Second Column: Will appear last (order: 5) */}
        <Col xs={{ order: 5 }} className="text-center">
          <Card className="price-card">
            <Card.Body>
              <IoBarChartOutline   style={{ fontSize: "50px"}} />
              <br />
              Chart
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Example;
