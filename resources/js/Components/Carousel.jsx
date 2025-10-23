import React from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = () => (
    <div className="react-carousel-card">
        <ReactCarousel
            className="react-carousel"
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            swipeable={true}
            emulateTouch={true}
            autoPlay={true}
            interval={4000}
            infiniteLoop={true}
            dynamicHeight={false}
        >
            <div className="react-carousel-slider">
                <div className="image-wrapper">
                    <img
                        src="/images/Logo-Friendflix.webp"
                        alt="Logo Friendflix'"
                        width="550"
                        height="550"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
            <div className="react-carousel-slider">
                <div className="image-wrapper">
                    <img
                        src="/images/Principal-1.webp"
                        alt="Frase 'Descubre'"
                        width="550"
                        height="550"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                    />
                </div>
            </div>
            <div className="react-carousel-slider">
                <div className="image-wrapper">
                    <img
                        src="/images/Principal-2.webp"
                        alt="Frase 'Comparte'"
                        width="550"
                        height="550"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
            <div className="react-carousel-slider">
                <div className="image-wrapper">
                    <img
                        src="/images/Principal-3.webp"
                        alt="Frase 'y Decide'"
                        width="550"
                        height="550"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </ReactCarousel>
    </div>
);

export default Carousel;
