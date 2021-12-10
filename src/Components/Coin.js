import React from "react";
import "./Coin.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Coin({
  id,
  symbol,
  name,
  high24,
  low24,
  priceChange,
  percentageChange,
  image,
  current_price,
}) {
  return (
    <Row className="g-4">
      <Col>
        <Card className="coinCard card-block mx-2">
          <a href={`/CoinPage/${id}`}>
            <Card.Img variant="top" src={image} className="coinImg" />
          </a>
          <Card.Body>
            <Card.Title>{name.toUpperCase()}</Card.Title>
            <Card.Text>Current price: {current_price}$</Card.Text>
            <Card.Text>High 24h: {high24}</Card.Text>
            <Card.Text>Low 24h: {low24}</Card.Text>
            <Card.Text>
              Price change:{" "}
              <span style={{ color: percentageChange > 0 ? "green" : "red" }}>
                {percentageChange}%
              </span>
              {}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Coin;
