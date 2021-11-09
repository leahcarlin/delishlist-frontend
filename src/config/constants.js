export const apiUrl = process.env.API_URL || "http://localhost:4000";
export const apiKey = "AIzaSyC8xDuaNPzG31t7Ns31FOlA8Q1HngWaWTM";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;

export const showEuros = (priceLevel) => {
  if (priceLevel === 1) {
    return "€";
  } else if (priceLevel === 2) {
    return "€€";
  } else if (priceLevel === 3) {
    return "€€€";
  } else if (priceLevel === 4) {
    return "€€€€";
  } else {
    return "";
  }
};
