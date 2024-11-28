import React from 'react';
import './Delivery.css';

const Delivery = () => {
    return (
        <div className="delivery-container">
            <h2>Delivery Information</h2>

            <div className="delivery-info">
                <h3>Delivery Options</h3>
                <p>We provide fast and reliable delivery to ensure your coffee products reach you fresh and on time.</p>

                <ul>
                    <li>
                        <strong>Standard Delivery:</strong>
                        <p>Delivery within 3-5 business days. Free for orders over $50, otherwise $5 per order.</p>
                    </li>
                    <li>
                        <strong>Express Delivery:</strong>
                        <p>Delivery within 1-2 business days. Costs $10 per order.</p>
                    </li>
                    <li>
                        <strong>Local Pickup:</strong>
                        <p>Pick up your order from our store at no additional cost. Available during business hours.</p>
                    </li>
                </ul>
            </div>

            <div className="delivery-terms">
                <h3>Terms & Conditions</h3>
                <ul>
                    <li>Orders placed after 3:00 PM will be processed the next business day.</li>
                    <li>Delivery may be delayed during holidays or due to unforeseen circumstances.</li>
                    <li>For any issues with delivery, please contact our support team at <a href="mailto:support@coffeer.com">support@coffeer.com</a>.</li>
                </ul>
            </div>

            <div className="contact-delivery">
                <h3>Contact Us</h3>
                <p>If you have any questions about delivery, feel free to reach out to us:</p>
                <ul>
                    <li>Email: <a href="mailto:support@coffeer.com">support@coffeer.com</a></li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Live Chat: Available 24/7</li>
                </ul>
            </div>
        </div>
    );
};

export default Delivery;
