import React, { useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites, removeFavorite } from "../../store/user/actions";
import { selectFavorites } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { showEuros } from "../../config/constants";

export default function MyFavorites() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  console.log("fav?", favorites);

  useEffect(() => {
    dispatch(getFavorites);
  }, [dispatch]);

  const clickToRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  if (!favorites) return <Loading />;

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <h2>
          <b>My Favorite Restaurants</b>
        </h2>
      </Row>
      {favorites.length === 0 ? (
        <p>Your favorites list is empty!</p>
      ) : (
        favorites.map((res) => (
          <div
            className="RestaurantDetails"
            key={res.id}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div className="col-2">
              <Link to={`/restaurant/${res.placeId}`}>
                <Image
                  style={{ borderRadius: "10px" }}
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${res.photoReference}&key=${process.env.REACT_APP_GKEY}`}
                />
              </Link>
            </div>
            <div className="col-3">
              <Link
                to={`/restaurant/${res.placeId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <b>{res.name}</b>
                </p>
              </Link>
              <p>Rating: {parseFloat(res.rating)}</p>
              {res.priceLevel ? <p>{showEuros(res.priceLevel)}</p> : null}
            </div>
            <div>
              <button
                onClick={() => clickToRemove(res.id)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  fontSize: ".75em",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </Container>
  );
}
