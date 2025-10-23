import React from "react";

const PopularSkeletonCard = () => {
  return (
    <div className="movie-container skeleton">
      <div className="movie-card">
        <div className="sk-poster sk-anim" />
        <div className="overlay">
          <div className="sk-backdrop sk-anim" />
          <div className="movie-details">
            <div className="sk-line sk-anim" style={{ width: "80%" }} />
            <div className="sk-btn sk-anim" />
          </div>
        </div>
      </div>

      <div className="movie-card-title">
        <div className="movie-card-head">
          <div className="sk-title sk-anim" />
          <div className="sk-heart sk-anim" />
        </div>
        <div className="star-rating">
          <div className="sk-stars sk-anim" />
        </div>
      </div>
    </div>
  );
};

export default PopularSkeletonCard;
