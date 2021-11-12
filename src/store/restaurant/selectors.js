export const selectRestaurantDetails = (state) =>
  state.restaurant.restaurantDetails;

export const selectSearch = (state) => state.restaurant.searchResults;

export const selectAllRestaurants = (state) => state.restaurant.allRestaurants;
