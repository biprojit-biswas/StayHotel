// export default FlightBooking;
// client/src/pages/FlightBooking.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this path is correct

const FlightBooking = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        class: 'Economy',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateFlightPrice = () => {
        let basePrice = 5000;
        let classMultiplier = 1;
        if (formData.class === 'Business') classMultiplier = 2;
        if (formData.class === 'First Class') classMultiplier = 3;
        let total = formData.passengers * basePrice * classMultiplier;
        if (isRoundTrip) {
            total *= 2;
        }
        return total;
    };

    const handleNextStep = () => {
        // Basic validation before moving to the next step
        if (currentStep === 1) { // Trip type selection
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) { // From/To
            if (formData.from && formData.to) {
                setCurrentStep(currentStep + 1);
            } else {
                setMessage('Please fill in both From and To locations.');
            }
        } else if (currentStep === 3) { // Dates
            if (formData.departureDate && (!isRoundTrip || formData.returnDate)) {
                 if (isRoundTrip && new Date(formData.returnDate) < new Date(formData.departureDate)) {
                    setMessage('Return date cannot be before departure date.');
                    return;
                }
                setCurrentStep(currentStep + 1);
            } else {
                setMessage('Please select departure date and return date (if round trip).');
            }
        } else if (currentStep === 4) { // Passengers/Class
            if (formData.passengers > 0 && formData.class) {
                setCurrentStep(currentStep + 1);
            } else {
                setMessage('Please specify passengers and class.');
            }
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
        setMessage(''); // Clear message when going back
    };

    const handleSubmit = async () => {
        setMessage('Booking flight...');
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to book a flight.');
            return;
        }

        try {
            const totalPrice = calculateFlightPrice();
            const bookingData = {
                ...formData,
                totalPrice,
                class: formData.class,
                returnDate: isRoundTrip ? formData.returnDate : null,
            };
            await axios.post('http://localhost:5000/api/flight-bookings', bookingData, {
                headers: { 'x-auth-token': token },
            });
            setMessage('Flight booked successfully! Redirecting to your bookings...');
            setTimeout(() => {
                navigate('/mybookings');
            }, 2000);
        } catch (err) {
            setMessage(err.response?.data.msg || 'Failed to book flight. Please try again.');
        }
    };

    return (
        <div className="flight-reservation-page">
            <h1 className="form-main-title">Flight Reservation Form</h1>
            <div className="form-step-container">
                {currentStep === 1 && (
                    <div className="form-step-card animated-fade-in">
                        <p className="step-question">1. Type of trip</p>
                        <div className="radio-option" onClick={() => setIsRoundTrip(false)}>
                            <input type="radio" id="oneWay" name="tripType" checked={!isRoundTrip} readOnly />
                            <label htmlFor="oneWay">One way</label>
                        </div>
                        <div className="radio-option" onClick={() => setIsRoundTrip(true)}>
                            <input type="radio" id="roundTrip" name="tripType" checked={isRoundTrip} readOnly />
                            <label htmlFor="roundTrip">Round trip</label>
                        </div>
                        <div className="form-navigation">
                            <span className="press-enter-hint">Press ENTER</span>
                            <button onClick={handleNextStep} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="form-step-card animated-fade-in">
                        <p className="step-question">2. Where are you flying from and to?</p>
                        <div className="form-group">
                            <label htmlFor="from">From</label>
                            <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="City or Airport" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="to">To</label>
                            <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="City or Airport" required />
                        </div>
                        <div className="form-navigation">
                            <button onClick={handlePreviousStep} className="back-btn">Back</button>
                            <button onClick={handleNextStep} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="form-step-card animated-fade-in">
                        <p className="step-question">3. When are you traveling?</p>
                        <div className="form-group">
                            <label htmlFor="departureDate">Departure Date</label>
                            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                        </div>
                        {isRoundTrip && (
                            <div className="form-group">
                                <label htmlFor="returnDate">Return Date</label>
                                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                            </div>
                        )}
                         <div className="form-navigation">
                            <button onClick={handlePreviousStep} className="back-btn">Back</button>
                            <button onClick={handleNextStep} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="form-step-card animated-fade-in">
                        <p className="step-question">4. How many passengers and what class?</p>
                        <div className="form-group">
                            <label htmlFor="passengers">Passengers</label>
                            <input type="number" name="passengers" value={formData.passengers} onChange={handleChange} min="1" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="class">Class</label>
                            <select name="class" value={formData.class} onChange={handleChange} required>
                                <option value="Economy">Economy</option>
                                <option value="Business">Business</option>
                                <option value="First Class">First Class</option>
                            </select>
                        </div>
                         <div className="form-navigation">
                            <button onClick={handlePreviousStep} className="back-btn">Back</button>
                            <button onClick={handleNextStep} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="form-step-card animated-fade-in">
                        <p className="step-question">5. Review & Book</p>
                        <div className="summary-details">
                            <p><strong>Trip Type:</strong> {isRoundTrip ? 'Round Trip' : 'One Way'}</p>
                            <p><strong>From:</strong> {formData.from}</p>
                            <p><strong>To:</strong> {formData.to}</p>
                            <p><strong>Departure:</strong> {new Date(formData.departureDate).toLocaleDateString()}</p>
                            {isRoundTrip && <p><strong>Return:</strong> {new Date(formData.returnDate).toLocaleDateString()}</p>}
                            <p><strong>Passengers:</strong> {formData.passengers}</p>
                            <p><strong>Class:</strong> {formData.class}</p>
                            <p className="estimated-total">Estimated Total: <strong>BDT {calculateFlightPrice()}</strong></p>
                        </div>
                        <div className="form-navigation">
                            <button onClick={handlePreviousStep} className="back-btn">Back</button>
                            <button onClick={handleSubmit} className="next-btn">Confirm & Book</button>
                        </div>
                    </div>
                )}
                {message && <p className="form-message">{message}</p>}
            </div>
        </div>
    );
};

export default FlightBooking;