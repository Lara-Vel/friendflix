import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating }) {
    const stars = [];
    const roundedRating = parseFloat(rating.toFixed(2));

    const filledStars = Math.floor(roundedRating / 2);
    const hasHalfStar = roundedRating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
        if (i < filledStars) {
            stars.push(<FaStar key={i} className="star-icon filled" />);
        } else if (hasHalfStar && i === filledStars) {
            stars.push(<FaStarHalfAlt key={i} className="star-icon half" />);
        } else {
            stars.push(<FaRegStar key={i} className="star-icon empty" />);
        }
    }

    return (
        <div className="star-rating">
            <div className="stars">
                {stars.map((star, index) => (
                    <span key={index}>{star}</span>
                ))}
            </div>
            <div className="rating-number">{roundedRating.toFixed(1)}</div>
        </div>
    );
}
