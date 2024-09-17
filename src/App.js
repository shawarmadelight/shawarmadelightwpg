import './App.css';
import NavBar from './components/NavBar';
import React, { useEffect, useState, useRef } from 'react';
import ImageGallery from './components/ImageGallery';
import emailjs from 'emailjs-com';
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import Footer from './components/Footer';
import reviewData from './website_data/reviews.json'
import Carousel from './components/Carousel';
import generalReview from './website_data/aria-labels.json'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  // State for managing the navbar toggle
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Toggle navbar function
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  const formRef = useRef(null);
  const menuList = [
    {
      title: 'Appetizers',
      menuItems: [
        { price: 7.99, foodName: 'Hummus Plate', description: 'Try our classic hummus, served on a plate with a side pita bread.' },
        { price: 11.99, foodName: 'Hummus & Shawarma', description: 'Enjoy our Hummus & Shawarma Plate: Chicken or beef nestled on top of a bed of hummus, served on a plate with a side pita bread.' },
        { price: 7.49, foodName: 'Onion Rings', description: 'Satisfy your craving with our crispy Onion Rings. Perfect for snacking.' },
        { price: 7.49, foodName: 'Curly Fries', description: 'Dig into our Curly Fries: crispy and delicious, served in a generous portion.' },
        { price: 6.99, foodName: 'Deep Fried Pickles', description: 'Try our Deep Fried Pickles: 4 crunchy pieces, bursting with flavor!' },
        { price: 17.99, foodName: 'Chicken Fingers', description: 'Delight in our Chicken Fingers: Your choice of fries or salad on the side.' },
        { price: 11.99, foodName: 'Poutine', description: 'Golden fries topped with cheese and our homemade gravy.' },
        { price: 13.99, foodName: 'Shawarma Poutine', description: 'Golden fries topped with your choice of beef or chicken shawarma, cheeses, tomatoes, onions, garlic sauce, and tahini sauce.' },
        { price: 14.99, foodName: 'Curly Fries Pouting', description: 'Curly fries topped with cheese and our homemade gravy.' },
        { price: 8.49, foodName: 'Falafel', description: '5 large pieces of fried falafel.' },
      ]
    },
    {
      title: 'Hand Held Plates',
      menuItems: [
        { price: 35.99, foodName: 'Mixed Grill Mashawi', description: 'Savor the ultimate feast with our Mixed Girll Mashawi, boasting succulent beef, chicken, lamb, and kebab skewers served alongside rice, fires, salad, and 4 pieces of fluffy pita bread.' },
        { price: 14.99, foodName: 'Shawarma Delight Burger', description: 'Lettuce, onions, pieckles, tomatoes, ketchup, and mayo. Comes with your choice of fries or salad.' },
        { price: 14.99, foodName: 'Spicy Chicken Burger', description: 'Lettuce, onions, pieckles, tomatoes, ketchup, and mayo. Comes with your choice of fries or salad.' },
        { price: 11.99, foodName: 'Falafel Sliders', description: '3 large pieces of fried falafel in a soft bun topped with tomatoes, pickles, and tahini sauce.' },
        { price: 17.99, foodName: 'Cheesesteak Sandwich', description: 'Comes with grilled onions, assorted peppers, mushrooms, cheese, and steak. Comes with you choice of fries or salad.' },
        { price: 14.99, foodName: 'Shawarma Tacos', description: '3 shawarma tacos with your choice of beef or chicken. Comes with lettuce, tomatoes, pickles, garlic, and tahini sauce.' },
        { price: 13.99, foodName: 'Shawarma Rice Bowl', description: 'A bowl of yellow rice, topped with your choice of chicken, beef, or falafel.' },
        { price: 14.99, foodName: 'Kebab Rice Bowl', description: 'A bowl of yellow rice and kebabs.' },
        { price: 15.99, foodName: 'Lamb Rice Bowl', description: 'A bowl of yellow rice and lamb' },
        { price: 85.99, foodName: 'Family Size Mashawi Platter', description: 'Comes with 3 kebab skewers, 3 beef skewers, 3 chicken skewers, and 3 lamb skewers served alongside rice, fries, 2 salads, and 8 pieces of fluffy pita bread.' },
      ]
    },
    {
      title: 'Wraps',
      menuItems: [
        { price: 13.99, foodName: 'Beef Shawarma Wrap', description: 'Beef Shawarma Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 13.99, foodName: 'Chicken Shawarma Wrap', description: 'Chicken Shawarma Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 13.99, foodName: 'Donair Pita Wrap', description: 'Donair Pita Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 12.99, foodName: 'Falafel Wrap', description: 'Falafel Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 14.99, foodName: 'Kebab Wrap', description: 'Kebab Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 15.99, foodName: 'Lamp Wrap', description: 'Lamb Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 14.99, foodName: 'Beef Mashawi Skewer Wrap', description: 'Beef Mashawi Skewer Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 14.99, foodName: 'Chicken Mashawi Skewer Wrap', description: 'Chicken Mashawi Shawarma Wrap includes lettuce, tomatoes, pickles, onlions, tahini, and garlic sauce.' },
        { price: 17.99, foodName: 'Arabic Style Shawarma Wrap', description: 'Arabic Style Shawarma Wrap cut up in pieces, come with garlic sauce, pickles, and fries.' },
      ]
    },
    {
      title: 'Sides & Drinks',
      menuItems: [
        { price: 5.99, foodName: 'Rice', description: '' },
        { price: 1.99, foodName: 'Pita Bread', description: '' },
        { price: 1, foodName: 'Garlic Sauce', description: '' },
        { price: 1, foodName: 'Hot Sauce', description: '' },
        { price: 1.50, foodName: 'Falafel Ball', description: '' },
        { price: 3.99, foodName: 'Side Gravy', description: '' },
        { price: 2.50, foodName: 'Canned Pop', description: '' },
        { price: 4.99, foodName: 'Barbican', description: '' },
        { price: 5.99, foodName: 'Homemade Juices', description: '' },
        { price: 4.99, foodName: 'Mirinda', description: '' },
        { price: 2.69, foodName: 'Arabic Coffee', description: '' },
        { price: 4.99, foodName: 'Redbull', description: '' },
        { price: 1, foodName: 'Bottled Water', description: '' },
      ]
    },
    {
      title: 'Plates',
      menuItems: [
        { price: 15.99, foodName: 'Falafel Plate', description: 'Falafel places on a bed of rice alongside a side salad, hummus, tahini, and garlic sauce.' },
        { price: 16.99, foodName: 'Beef Shawarma Plate', description: 'Tender beef shawarma plate, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 16.99, foodName: 'Chicken Shawarma Plate', description: 'Chicken shawarma plate, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 16.99, foodName: 'Donair Plate', description: 'Donair plate, featuring savory grilled meat on a bed of rice accompanied by a side salad, hummus, tahini, and garlic sauce.' },
        { price: 19.99, foodName: 'Mixed Meat Plate', description: 'Tender chicken and beef, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 17.99, foodName: 'Kebab Plate', description: 'Juicy grilled meat, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 17.99, foodName: 'Beef Mashawi Skewer Plate', description: 'Beef on skewers, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 17.99, foodName: 'Chicken Mashawi Skewer Plate', description: 'Chicken on skewers, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
        { price: 19.99, foodName: 'Lamb Plate', description: 'Juicy grilled lamb, served on a bed of rice, a side salad, hummus, tahini, and garlic sauce.' },
      ]
    },
    {
      title: 'Others',
      menuItems: [
        { price: 15.99, foodName: 'Chicken Wings', description: 'A pound of our juicy chicken wings with your choice of salt and pepper. Available in hot, teriyaki, sweet chilli, honey garlic, BBQ, and house hot sauce.' },
        { price: 7.99, foodName: 'Caesar Salad', description: 'Fresh romaine lettuce with caesae dressing and garlic croutons' },
        { price: 8.99, foodName: 'Tabouli Salad', description: 'Chopped parsley, tomatoes, mint, and onion with lemon and olive oil vinaigrette.' },
      ]
    },
  ];

  const [isFormComplete, setIsFormComplete] = useState(false);

  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setOffsetY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    location: '',
    numberOfAttendees: '',
    foodRequirements: '',
  });

  const initialFormData = {
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    location: '',
    numberOfAttendees: '',
    foodRequirements: '',
  };

  useEffect(() => {
    const isComplete = Object.values(formData).every(value => value.trim() !== '');
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatTimeTo12Hour = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12; // Convert '0' hour to '12'
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDxh7GADhmh_-DI05croUhi2weDeHxfoKU",
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const center = {
    lat: 49.879050,
    lng: -97.215630
  };

  const infoWindowPosition = {
    lat: center.lat + 0.0005,  // Offset the InfoWindow slightly to the south of the marker
    lng: center.lng,
  };

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_80ae8ei';
    const templateID = 'template_3bvd9co';
    const userID = 'aBnsiehpK6X-OJFk7';

    const formattedData = {
      ...formData,
      time: formatTimeTo12Hour(formData.time),
    };

    emailjs.send(serviceID, templateID, formattedData, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Form submitted successfully!');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Failed to submit form. Please try again.');
      });
  };

  const handleButtonClick = () => {
    if (isFormComplete) {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else {
      alert('Please fill in all the required information.');
    }
  };

  const handleResetButtonClick = () => {
    setFormData(initialFormData);
  };

  const calculateAverageRating = (ratings) => {
    let totalReviews = 0;
    let weightedSum = 0;
    ratings.forEach(rating => {
      const starCount = parseInt(rating['aria-label'].split(' ')[0], 10);
      const reviewCount = parseInt(rating['aria-label'].split(' ')[2], 10);
      totalReviews += reviewCount;
      weightedSum += starCount * reviewCount;
    });
    return (weightedSum / totalReviews).toFixed(1);
  };

  const averageRating = calculateAverageRating(generalReview);

  const calculateTotalReview = (ratings) => {
    let totalReviews = 0;
    let weightedSum = 0;
    ratings.forEach(rating => {
      const starCount = parseInt(rating['aria-label'].split(' ')[0], 10);
      const reviewCount = parseInt(rating['aria-label'].split(' ')[2], 10);
      totalReviews += reviewCount;
      weightedSum += starCount * reviewCount;
    });
    return totalReviews;
  };

  const totalReview = calculateTotalReview(generalReview);

  const renderStars = (stars) => {
    const starCount = parseInt(stars[0], 10);
    return (
      <div className="stars" id='main'>
        <div>
          {Array.from({ length: starCount }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
        </div>
        <p>{averageRating} stars of {totalReview} reviews</p>
      </div>
    );
  };


  return (
    <div className="App">
      <button className="hamburger-icon" onClick={toggleNavbar} style={isNavbarOpen ?
        { color: 'white', backgroundColor: 'black', border: '2px solid black' } :
        { color: 'black', backgroundColor: 'transparent', border: 'none' }
      }>
        {isNavbarOpen ? '\u00D7' : '\u2630'} {/* Unicode for X and hamburger icon */}
      </button>
      <NavBar isOpen={isNavbarOpen} />
      <div className='MainBody'>
        <div className='Home' id='Home' >
          <p>Welcome to</p>
          <p>SHAWARMA DELIGHT</p>
          <p className='WelcomeText'>At Shawarma Delight, we bring you a genuine and varied menu that showcases the vibrant tastes of Middle Eastern cuisine. Our inviting and cozy setting is ideal for unwinding and enjoying time with loved ones. We emphasize using fresh, premium ingredients to prepare meals that are as nutritious as they are flavorful. Whether you’re in the mood for a fulfilling dish or a cool beverage, Shawarma Delight is your go-to spot for all your culinary needs.</p>
        </div>
        <div className='Gallery' id='Gallery'>
          <h1 className='GalleryTitle'>GALLERY</h1>
          <ImageGallery />
        </div>
        <div className='Menu' id='Menu'>
          <h1 className='TheMenuTitle'>THE MENU</h1>
          <div className='MenuCards'>
            {menuList.map((menu, index) => (
              <MenuCard key={index} title={menu.title} menuItems={menu.menuItems} />
            ))}
          </div>
        </div>
        <div className='Reviews' id='Reviews'>
          <div className='ReviewHeader'>
            <h1 className='TheReviewTitle'>Customer Testimonials on Google</h1>
            {renderStars("5 stars")}
          </div>
          <Carousel reviewData={reviewData} />
        </div>
        <div className='ContactUs' id='ContactUs'>
          <GoogleMap mapContainerStyle={containerStyle} options={mapOptions} center={center} zoom={16}>
            <MarkerF position={center} />
            <InfoWindow position={infoWindowPosition}>
              <div className="info-window">
                <div className="info-window-title">Shawarma Delight</div>
                <p className="info-window-address">1839 Portage Avenue, Winnipeg, MB R3J 0G7</p>
              </div>
            </InfoWindow>
          </GoogleMap>
        </div>
        <div className='CorporateCatering' id='CorporateCatering'>
          <h1 className='CorporateCateringTitle'>REACH OUT TO US FOR CORPORATE CATERING</h1>
          <form className='CateringInformation' onSubmit={handleSubmit} ref={formRef}>
            <div className='CateringInformation_Name'>
              <h1>Contact Name <span className='important_data'>*</span></h1>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Ph'>
              <h1>Contact Number <span className='important_data'>*</span></h1>
              <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Email'>
              <h1>Email Address <span className='important_data'>*</span></h1>
              <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Date'>
              <h1>Date of Event <span className='important_data'>*</span></h1>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Time'>
              <h1>Time of Event <span className='important_data'>*</span></h1>
              <input type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Location'>
              <h1>Location of Event <span className='important_data'>*</span></h1>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Number'>
              <h1>Number of Attendees <span className='important_data'>*</span></h1>
              <input type="number" name="numberOfAttendees" value={formData.numberOfAttendees} onChange={handleChange} />
            </div>
            <div className='CateringInformation_Food'>
              <h1>Food and Beverage Requirements <span className='important_data'>*</span></h1>
              <textarea type="text" name="foodRequirements" value={formData.foodRequirements} onChange={handleChange}></textarea>
              <p>*Please let us know about your dietary restrictions</p>
              <p>*Please allow a few days for us to follow up with more details and an estimated quote.</p>
            </div>
          </form>
          <div className='buttons'>
            <div className='submitButton'>
              <button type="button" onClick={handleButtonClick} disabled={!isFormComplete}>Submit</button>
            </div>
            <div className='resetButton'>
              <button type="button" onClick={handleResetButtonClick}>Reset</button>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;

function MenuCard({ title, menuItems }) {
  return (
    <div className='menuCard'>
      <h1 className='menuSectionTitle'>{title}</h1>
      {menuItems.map((item, index) => (
        <div key={index} className='menuItems'>
          <p className='itemPrice'>${item.price}</p>
          <p className='itemName'>
            <span className='foodName'>{item.foodName}</span><br />
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}