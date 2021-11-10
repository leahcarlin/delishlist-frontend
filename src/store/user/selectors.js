export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const selectMyLists = (state) => state.user.myLists;

export const selectUserSearch = (state) => state.user.searchResults;

export const selectFavorites = (state) => state.user.favorites;

// favorite array with only restaurant id's
export const selectFavoriteIds = (state) => {
  if (state.user.favorites) return state.user.favorites.map((res) => res.id);
  else return null;
};

// favorite array with only restaurant placeId's
export const selectFavoritePlaceIds = (state) => {
  if (state.user.favorites)
    return state.user.favorites.map((res) => res.placeId);
  else return null;
};
