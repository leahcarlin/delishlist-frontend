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
import FindRestaurants from "./pages/FindRestaurants.js";

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
        <Route exact path="/" component={MyLists} />
        <Route path="/list/:id" component={ListDetails} />
        <Route path="/restaurant/find" component={FindRestaurants} />
        <Route path="/restaurant/:id" component={RestaurantDetails} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
