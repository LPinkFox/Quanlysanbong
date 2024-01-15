import React, { createContext, useState } from 'react'
import Products from "../Products.js"
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = Products;
    for (let i = 0; i < cart.length; i++) {
        cart[i].soLuong = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const resetShopContext = () => {
        setCartItems(getDefaultCart());
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item].soLuong > 0) {
                totalAmount += cartItems[item].soLuong * cartItems[item].giaBan;
            }
        }
        return totalAmount;
    };

    const addToCart = (sanPhamID) => {
        setCartItems(prevCartItems => 
            prevCartItems.map(item => 
                item.id === sanPhamID ? { ...item, soLuong: item.soLuong + 1 } : item
            )
        );
    };

    const removeFromCart = (sanPhamID) => {
        setCartItems(prevCartItems => 
            prevCartItems.map(item => 
                item.id === sanPhamID ? { ...item, soLuong: item.soLuong - 1 } : item
            )
        );
    };

    const updateCartItemCount = (newAmount, sanPhamID) => {
        setCartItems(prevCartItems => 
            prevCartItems.map(item => 
                item.id === sanPhamID ? { ...item, soLuong: newAmount } : item
            )
        );
    };

    const checkout = () => {
        setCartItems(getDefaultCart());
    };

    const contextValue = {
        cartItems,
        addToCart,
        updateCartItemCount,
        removeFromCart,
        getTotalCartAmount,
        checkout,
        resetShopContext
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};