import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [showDescription, setShowDescription] = useState(true);

    const toggleDescription = useCallback(() => {
        setShowDescription(prev => !prev);
    }, []); 

    const descriptionContent = useMemo(() => {
        return (
            <p>
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content here, content here', making it look
                like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
                as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years, sometimes by accident.
            </p>
        );
    }, []);

    useEffect(() => {
        console.log(`Description is now ${showDescription ? 'visible' : 'hidden'}`);
    }, [showDescription]);

    useEffect(() => {
        console.log('Component was Mounted');
        return () => {
            console.log('Component was Unmounted');
        };
    }, []);

    return (
        <div className='hero'>
            <div className="hero-left">
                <div>
                    <div className="hero-coffee-icon">
                        <h1>Coffeer</h1>
                        <h1>For Everyone</h1>
                    </div>
                </div>
                <div className="hero-latest-btn">
                    <div>
                        {showDescription && descriptionContent}
                    </div>
                    <div className='butts'>
                        <div>
                            <button onClick={toggleDescription} className="hero-latest-button">
                                {showDescription ? ':(' : ':)'}
                            </button>
                        </div>
                        <div>
                            <Link to={'/products'}>
                                <button className="hero-latest-button">Shop Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-right">
            </div>
        </div>
    );
};

export default Hero;
