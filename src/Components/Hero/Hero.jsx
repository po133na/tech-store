import React from 'react'
import './Hero.css'
import coffee_icon from '../Assets/coffee_icon.png'
import arrow_icon from '../Assets/arrow_icon.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <div>
                <div className="hero-coffee-icon">
                    <p>New</p>
                    <img src={coffee_icon} alt=""/>
                    <p>Coffee</p>
                <p>For Everyone</p>
                </div>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Arrivals</div>
                <img src={arrow_icon} alt=""/>
            </div>
        </div>
        <div className="hero-right">

        </div>
    </div>
  )
}

export default Hero