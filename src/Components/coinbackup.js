import React from "react";
import "./Coin.css";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
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
    <Card>
      <Card.Img
        variant="top"
        src={image}
        width={100}
        height={100}
        title={symbol}
      />
      <Card.Body id={id}>
        <Card.Title>{name.toUpperCase()}</Card.Title>
        <Card.Text>
          <Table responsive="x1">
            <thead>
              <tr>
                <th>Current price</th>
                <th>High 24H</th>
                <th>Low 24H</th>
                <th>Price change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{current_price}$</td>
                <td>{high24}$</td>
                <td>{low24}$</td>
                <td style={{ color: percentageChange > 0 ? "green" : "red" }}>
                  {percentageChange}%
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Coin;
