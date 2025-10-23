import React from "react";

const SearchSkeletonCard = () => {
    return (
        <div className="search-result-card skeleton">
            <div className="search-poster-wrapper">
                <div className="sk-poster sk-anim" />
            </div>

            <div className="sk-right">
                <div className="sk-title sk-anim" />
                <div className="sk-line sk-anim" />
                <div className="sk-line sk-anim" style={{ width: "85%" }} />
                <div className="sk-line sk-anim" style={{ width: "65%" }} />

                <div className="sk-heart sk-anim sk-heart--abs" />
            </div>
        </div>
    );
};

export default SearchSkeletonCard;
