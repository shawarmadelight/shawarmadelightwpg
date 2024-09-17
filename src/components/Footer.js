import React from 'react'
import './Footer.css'
import FooterLogo from '../website_data/Logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMap, faPhone } from '@fortawesome/free-solid-svg-icons';
import Skip from '../website_data/skip.png'
import Uber from '../website_data/file.png'

function Footer() {
  return (
    <div className='Footer'>
      <div className='Footer_Socials'>
        <img className='Logo' src={FooterLogo} />
      </div>
      <div className='Socials'>
        <div className='Links'>
          <a href="https://www.instagram.com/shawarmadelightwpg/?locale=en_US%2Cen_US%2Cen_US%2Cen_US" target='_blank'>
            <FontAwesomeIcon icon={faInstagram} style={{ color: 'black' }} className='LinkLogo' />
          </a>
          <a href="https://www.ubereats.com/ca/store/shawarma-delight/9qckVEsgXFWS99E1RZR6Fw" target='_blank'>
            <img src={Uber} className='LinkLogo' />
          </a>
          <a href="https://www.skipthedishes.com/shawarma-delight-1839" target='_blank'>
            <img src={Skip} className='LinkLogo' />
          </a>
        </div>
        <a className='Location' href="https://www.google.com/maps/place/Shawarma+Delight/@49.8789741,-97.2182156,16z/data=!3m1!4b1!4m6!3m5!1s0x52ea7371a3bde005:0xd130b0d18e21b9ad!8m2!3d49.8789707!4d-97.2156407!16s%2Fg%2F11vkk5g5mf?entry=ttu" target='_blank'>
          <FontAwesomeIcon icon={faMap} /> 1839 Portage Ave, Winnipeg, MB R3J 0G7
        </a>
        <a className='Phone' href="tel:+12046150077">
          <FontAwesomeIcon icon={faPhone} /> Call Us: +1 204 615 0077
        </a>
      </div>
      <div className='Footer_OpeningHours'>
        <h1 className='OpeningHoursTitle'>Opening Hours</h1>
        <p>Monday to Sunday: 11 am to 1 am</p>
      </div>
    </div>
  )
}

export default Footer