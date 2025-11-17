import React, { useEffect, useState } from "react";
// import { mockData } from "../utils/mockData";
import { THUMB_BASE_URL, SWIGGY_API } from "../utils/constant";
import "./Restaurant.css";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Restaurant() {
  const [defaultrestaurants, setDefaultRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDoingSearch, setIsDoingSearch] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();
    setRestaurants(json.data.cards[1].groupedCard.cardGroupMap.DISH.cards);
    setDefaultRestaurants(
      json.data.cards[1].groupedCard.cardGroupMap.DISH.cards
    );
  };
  const resetData = () => {
    setDefaultRestaurants(defaultrestaurants);
  };
  const filterTopRated = (rating = 4) => {
    console.log(rating);
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant?.card?.card?.info?.ratings?.aggregatedRating?.rating >=
        rating
    );
    setRestaurants(filtered);
  };
  const searchTest = () => {
    const filtered = defaultrestaurants.filter((restaurant) =>
      restaurant?.card?.card?.info?.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setIsDoingSearch(true);
    setRestaurants(filtered);
  };
  return (
    <div>
      <div className="filter-container">
        <div className="filterDiv">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className=""
            onClick={() => {
              searchTest();
            }}
          >
            Search
          </button>
        </div>
        <div className="filterDiv">
          <label>Sort By: </label>
          <select onChange={(e) => filterTopRated(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="4">Rating</option>
            <option value="cost-asc">Cost: Low to High</option>
            <option value="cost-desc">Cost: High to Low</option>
            <option value="delivery-time">Delivery Time</option>
          </select>
        </div>
      </div>
      <div className="container">
        {restaurants.length === 0 ? (
          isDoingSearch == true ? (
            "NO DATA"
          ) : (
            <Shimmer />
          )
        ) : (
          restaurants.map((list) => {
            const listObj = list?.card?.card?.info;
            return (
              listObj && (
                <Link to="/restaurant-menu/" key={listObj.id}>
                  {console.log(listObj)}
                  <div key={listObj.id} className="restaurant-card">
                    <img
                      src={THUMB_BASE_URL + listObj.imageId}
                      alt="restaurant-logo"
                      className="itemImage"
                    />
                    <div>
                      <b>{listObj.name}</b>
                    </div>
                    <div>{listObj.price}</div>
                    <div>{listObj.ratings?.aggregatedRating?.rating} ⭐</div>
                    <div>{listObj.description}</div>
                  </div>
                </Link>
              )
            );
          })
        )}
      </div>
    </div>
  );
}

export default Restaurant;
