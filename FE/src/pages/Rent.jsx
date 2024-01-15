import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './Rent.css';
import { allYard } from '../Yard'
import { Yard } from './Yard';

const Rent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [hasSelected, setHasSelected] = useState(false);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };
    useEffect(() => {
        if (selectedDate && selectedTime) {
            setHasSelected(true);
        }
    }, [selectedDate, selectedTime]);
    const formattedDate = selectedDate 
    ? selectedDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
    // console.log(formattedDate);
    const timeSlots = ['Kíp 1', 'Kíp 2', 'Kíp 3', 'Kíp 4', 'Kíp 5'];
    return (
        <>
            <Navbar />
            <div className="my-yard-container">
                <h1 className="my-yard-title">Chọn ngày và kíp</h1>
                <label className="my-yard-date-picker-label">Chọn ngày:</label>
                <DatePicker
                    className="my-yard-date-picker"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    placeholderText="Select a date"
                />
                <div className="my-yard-select-container">
                    <label className="my-yard-select-label">Chọn kíp:</label>
                    <select className="my-yard-select" value={selectedTime} onChange={handleTimeChange}>
                        {selectedTime === '' && <option value="Kíp">Kíp</option>}
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {hasSelected && formattedDate && <div className="my-yard-container">
                {allYard.map((yard) => {
                    return <Yard className="my-yard" date={formattedDate} id={yard.id} kip={timeSlots.indexOf(selectedTime) + 1} giaSan={yard.gia} />
                })}
            </div>}
        </>
    );
};

export default Rent;
