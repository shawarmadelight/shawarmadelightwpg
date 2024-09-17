import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Carousel = ({ reviewData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerRow, setCardsPerRow] = useState(4);

    useEffect(() => {
        const updateCardsPerRow = () => {
            if (window.innerWidth < 900) {
                setCardsPerRow(1);
            } else if (window.innerWidth < 1300) {
                setCardsPerRow(2);
            } else if (window.innerWidth < 1800) {
                setCardsPerRow(3);
            } else {
                setCardsPerRow(4);
            }
        };

        window.addEventListener('resize', updateCardsPerRow);
        updateCardsPerRow(); // Initial check

        return () => window.removeEventListener('resize', updateCardsPerRow);
    }, []);

    const filteredReviews = reviewData.filter(review =>
        (review.stars === '4 stars' || review.stars === '5 stars') && review.comment
    );

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + cardsPerRow) % filteredReviews.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - cardsPerRow + filteredReviews.length) % filteredReviews.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 10000);

        return () => clearInterval(interval);
    }, [cardsPerRow]);

    const visibleReviewItems = [];
    for (let i = 0; i < cardsPerRow * 2; i++) {
        visibleReviewItems.push(filteredReviews[(currentIndex + i) % filteredReviews.length]);
    }

    const renderStars = (stars) => {
        const starCount = parseInt(stars[0], 10);
        return (
            <div className="stars">
                {Array.from({ length: starCount }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} />
                ))}
            </div>
        );
    };

    return (
        <div className="carousel">
            <button className="carousel-button" onClick={prev}>‹</button>
            <div className="carousel-content">
                {visibleReviewItems.slice(0, cardsPerRow).map(item => (
                    <div key={item.name} className='carousel-card'>
                        <div className='carousel-header'>
                            <div className='carousel-image'>
                                <img loading="lazy" src={item.imageSrc} alt={item.name} />
                            </div>
                            <div className='carousel-name-when'>
                                <p className='carousel-name'>{item.name}</p>
                                <p className='carousel-when'>{item.time}</p>
                            </div>
                        </div>
                        <div className='carousel-stars-review'>
                            {renderStars(item.stars)}
                            <p className='carousel-review'>{item.comment}</p>
                        </div>
                    </div>
                ))}
                {visibleReviewItems.slice(cardsPerRow).map(item => (
                    <div key={item.name} className='carousel-card'>
                        <div className='carousel-header'>
                            <div className='carousel-image'>
                                <img loading="lazy" src={item.imageSrc} alt={item.name} />
                            </div>
                            <div className='carousel-name-when'>
                                <p className='carousel-name'>{item.name}</p>
                                <p className='carousel-when'>{item.time}</p>
                            </div>
                        </div>
                        <div className='carousel-stars-review'>
                            {renderStars(item.stars)}
                            <p className='carousel-review'>{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-button" onClick={next}>›</button>
        </div>
    );
};

export default Carousel;
