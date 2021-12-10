import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "../Components/Coin";
import Spinner from "react-bootstrap/Spinner";
import "./Home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCoins, setNumberOfCoins] = useState();

  useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = () => {
    setIsLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setCoins(response.data);
        setNumberOfCoins(coins.length);
      });
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="wrapper">
      <div className="title">
        <h1>Welcome to CryptoChecker</h1>
      </div>
      <div className="searchArea">
        <label for="inp" class="inp">
          <input
            type="text"
            id="inp"
            placeholder="&nbsp;"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <span class="label">Search for coin</span>
          <span class="focus-bg"></span>
        </label>
      </div>
      {isLoading && (
        <>
          <Spinner animation="border" variant={"primary"}>
            LOADING
          </Spinner>
        </>
      )}
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={search !== "3000" ? "" : "10000000"}
        keyBoardControl={true}
        customTransition="all 2.5s"
        transitionDuration={3000}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {filterCoins.map((coins) => {
          return (
            <Coin
              id={coins.id}
              symbol={coins.symbol}
              name={coins.name}
              high24={coins.high_24h}
              low24={coins.low_24h}
              priceChange={coins.price_change_24h}
              percentageChange={coins.price_change_percentage_24h}
              image={coins.image}
              current_price={coins.current_price}
              numberofCoins={numberOfCoins}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default Home;
