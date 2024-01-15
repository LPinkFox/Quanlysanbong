import React, { createContext, useState } from 'react';
import { allYard } from '../Yard';
export const RentContext = createContext(null);

export const RentContextProvider = (props) => {
    const [rentedYard, setRentedYard] = useState([]);
    const resetRentContext = () => {
        setRentedYard([]);
    }
    const addToCart = (yardInfo) => {
        // Check if the yard is already in the rentedYard
        const isAlreadyInCart = rentedYard.some(
            (yard) => yard.id === yardInfo.id && yard.date === yardInfo.date && yard.kip === yardInfo.kip
        );

        if (isAlreadyInCart) {
            alert('Yard is already in rentedYard');
        } else {
            setRentedYard((prevRentedYard) => [...prevRentedYard, yardInfo]);
        }
    };
    const removeFromCart = (date, kip, id) => {
        setRentedYard((prevRentedYard) =>
            prevRentedYard.filter((yard) => yard.id !== id || yard.date !== date || yard.kip !== kip)
        );
    }
    const getTotalAmountYard = () => {
        let total = 0;
        rentedYard.forEach((yard) => {
            total += allYard[yard.id - 1].gia;
        })
        return total;
    }
    return (
        <RentContext.Provider value={{ rentedYard, setRentedYard, addToCart, getTotalAmountYard, resetRentContext, removeFromCart }}>
            {props.children}
        </RentContext.Provider>
    );
};
