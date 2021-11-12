import React, { useEffect } from "react";
import "./App.scss";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HeaderTabs from "./components/Navigation/HeaderTabs";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import MyLists from "./pages/MyLists";
import ListDetails from "./pages/ListDetails";
import RestaurantDetails from "./pages/RestaurantDetails";
import FindRestaurant from "./pages/FindRestaurant";

import AddCollaborator from "./pages/AddCollaborator";
import LandingPage from "./pages/LandingPage";
import MyFavorites from "./pages/MyFavorites";
import BrowseRestaurants from "./pages/BrowseRestaurants";

function App(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <HeaderTabs />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={MyLists} />
        <Route path="/list/:id" component={ListDetails} />
        <Route path="/restaurant/favorites" component={MyFavorites} />
        <Route path="/restaurant/find" component={FindRestaurant} />
        <Route path="/restaurant/browse" component={BrowseRestaurants} />
        <Route path="/users/add/list/:id" component={AddCollaborator} />
        <Route path="/restaurant/:place_id" component={RestaurantDetails} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
