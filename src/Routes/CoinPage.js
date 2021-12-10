import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CoinPage.css";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
  SparklinesReferenceLine,
} from "react-sparklines";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import moment from "moment";

function CoinPage() {
  const { id } = useParams();

  const [priceList, setPriceList] = useState([]);
  const [coin, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTime, setLastTime] = useState("");

  useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setCoin(response.data[0]);
        setPriceList(response.data[0].sparkline_in_7d.price);
        setLastTime(response.data[0].last_updated);
        updateLast();
      });
  };
  const updateLast = () => {
    setLastTime(moment().format("dddd, MMMM Do YYYY, h:mm:ss a", lastTime));
  };
  return (
    <>
      {isLoading && (
        <>
          <Spinner animation="border" variant={"primary"}>
            LOADING
          </Spinner>
        </>
      )}
      <div className="wrp">
        <div class="card mb-3">
          <span className="spanStyleLeft">
            {parseFloat(priceList[0]).toFixed(2)}$
          </span>
          <Sparklines data={priceList}>
            <SparklinesLine style={{ fill: "none" }} />
            <SparklinesNormalBand />
            <SparklinesReferenceLine type="max" />
          </Sparklines>
          <span className="spanStyleRight">
            {parseFloat(priceList.slice(-1)).toFixed(2)}$
          </span>

          <div class="card-body">
            <h5 class="card-title page">{coin.name} data</h5>

            <Container>
              <Row>
                <Col sm={8}>
                  <p class="card-text page">
                    Current price: ${coin.current_price}
                  </p>
                </Col>
                <Col sm={8}>
                  <p class="card-text page">
                    Price change in the last 7days:{" "}
                    <span
                      style={{
                        color:
                          coin.price_change_percentage_7d_in_currency > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.price_change_percentage_7d_in_currency}%
                    </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <p class="card-text page">
                    Lowest price in the last 24H: ${coin.low_24h}
                  </p>
                </Col>
                <Col sm>
                  <p class="card-text page">
                    Price change in the last 24H:{" "}
                    <span
                      style={{
                        color:
                          coin.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.price_change_percentage_24h}%
                    </span>
                  </p>
                </Col>
                <Col sm>
                  <p class="card-text page">
                    Highest price in the last 24H: ${coin.high_24h}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Link to="/coins">
                    <Button variant="primary">Go back</Button>
                  </Link>
                </Col>
                <Col xs={6}>
                  <Button variant="success" onClick={refreshPage}>
                    Refresh data
                  </Button>
                </Col>
              </Row>
            </Container>
            <p class="card-text">
              <small class="text-muted">Last updated at {lastTime} </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinPage;
