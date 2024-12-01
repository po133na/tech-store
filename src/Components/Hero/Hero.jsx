import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDescription } from '../../store/slices/heroSlice';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const dispatch = useDispatch();

    const showDescription = useSelector((state) => state.hero.showDescription);

    // Memoized description content
    const descriptionContent = useMemo(() => (
        <p>
            It is a long established fact that a reader will be distracted by the readable content of a
            page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here, content here', making it look
            like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
            as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years, sometimes by accident.
        </p>
    ), []);

    // Logging visibility changes
    useEffect(() => {
        console.log(`Description is now ${showDescription ? 'visible' : 'hidden'}`);
    }, [showDescription]);

    return (
        <div className="hero">
            <div className="hero-left">
                <div className="hero-coffee-icon">
                    <h1>Coffeer</h1>
                    <h1>For Everyone</h1>
                </div>

                <div className="hero-latest-btn">
                    {showDescription && <div>{descriptionContent}</div>}

                    <div className="hero-buttons">
                        <button
                            onClick={() => dispatch(toggleDescription())}
                            className="hero-latest-button"
                        >
                            {showDescription ? ':(' : ':)'}
                        </button>

                        <Link to="/products">
                            <button className="hero-latest-button">Shop Now</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hero-right">
                {/* Add right-side content */}
            </div>
        </div>
    );
};

export default Hero;
