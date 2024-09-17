import React, { useState, useEffect } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ImageGallery.css';
import FoodImage1 from '../website_data/Food_Images/Beef Shawarma Plate1.jpg';
import FoodImage2 from '../website_data/Food_Images/Chicken Shawarma Combo2.jpg';
import FoodImage3 from '../website_data/Food_Images/Chicken Shawarma Wrap3.jpg';
import FoodImage4 from '../website_data/Food_Images/Falafel Wrap4.jpg';
import FoodImage5 from '../website_data/Food_Images/Hummus and Shawarma5.jpg';
import FoodImage6 from '../website_data/Food_Images/Hummus Plate6.jpg';
import FoodImage7 from '../website_data/Food_Images/Kabob Plate7.jpg';
import FoodImage8 from '../website_data/Food_Images/Mixed Grill Mashawi Board8.jpg';
import FoodImage9 from '../website_data/Food_Images/Shawarma Wraps9.jpg';

const images = [
  { src: FoodImage1, alt: "Beef Shawarma Plate" },
  { src: FoodImage2, alt: "Chicken Shawarma Combo" },
  { src: FoodImage3, alt: "Chicken Shawarma Wrap" },
  { src: FoodImage4, alt: "Falafel Wrap" },
  { src: FoodImage5, alt: "Hummus and Shawarma" },
  { src: FoodImage6, alt: "Hummus Plate" },
  { src: FoodImage7, alt: "Kabob Plate" },
  { src: FoodImage8, alt: "Mixed Grill Mashawi Board" },
  { src: FoodImage9, alt: "Shawarma Wraps" },
];

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [currentIndex]);

  const openImage = (index) => {
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setCurrentIndex(null);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className='ImageGallery'>
      {images.map((image, index) => (
        <EachImage
          key={index}
          FoodImage={image.src}
          NameOfFood={image.alt}
          onClick={() => openImage(index)}
        />
      ))}
      {currentIndex !== null && (
        <div className='fullscreen'>
          <button className='close' onClick={closeImage}><FaTimes /></button>
          <button className='nav left' onClick={prevImage}><FaArrowLeft /></button>
          <button className='nav right' onClick={nextImage}><FaArrowRight /></button>
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
          <div className='image-info'>
            <span className='food-name'>{images[currentIndex].alt}</span>
            <span className='image-index'>{currentIndex + 1} of {images.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function EachImage({ FoodImage, NameOfFood, onClick }) {
  return (
    <div className='EachImage' onClick={onClick}>
      <img src={FoodImage} alt={NameOfFood} />
      <h1>{NameOfFood}</h1>
    </div>
  );
}

export default ImageGallery;
