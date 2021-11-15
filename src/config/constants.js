export const apiUrl = process.env.API_URL || "http://localhost:4000";
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

export const showStars = (rating) => {
  if (rating < 1) {
    return (
      <div>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 1 && rating < 1.5) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 1.5 && rating < 2) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-half" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 2 && rating < 2.5) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 2.5 && rating < 3) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-half" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 3 && rating < 3.5) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 3.5 && rating < 4) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-half" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 4 && rating < 4.5) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star"></i>
      </div>
    );
  } else if (rating >= 4.5 && rating < 5) {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-half" style={{ color: "#fcbf49" }}></i>
      </div>
    );
  } else {
    return (
      <div>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
        <i class="bi bi-star-fill" style={{ color: "#fcbf49" }}></i>
      </div>
    );
  }
};
