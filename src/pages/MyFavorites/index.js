import React, { useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../../store/user/actions";
import { selectFavorites } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { showEuros } from "../../config/constants";
import { apiKey } from "../../config/constants";

export default function MyFavorites() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  console.log("fav?", favorites);

  useEffect(() => {
    dispatch(getFavorites);
  }, [dispatch]);

  if (!favorites) return <Loading />;

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <h2>My Favorite Restaurants</h2>
      </Row>
      {favorites.map((res) => (
        <div
          className="RestaurantDetails"
          key={res.id}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className="col-2">
            <Link to={`/restaurant/${res.placeId}`}>
              <Image
                style={{ borderRadius: "10px" }}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${res.photoReference}&key=${apiKey}`}
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
        </div>
      ))}
    </Container>
  );
}
