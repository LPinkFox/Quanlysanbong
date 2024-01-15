import React, { createContext, useState } from 'react'
export const UserContext = createContext(null);
export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const login = (user) => {
        setIsLoggedin(true);
        setUser(user);
    };
    const logout = (log) => {
        setIsLoggedin(false);
        setUser(null);
    };
    const resetUserContext = () => {
        setUser(null);
        setIsLoggedin(false);
    };
    return (
        <UserContext.Provider value={{ user, isLoggedin, login, logout, resetUserContext }}>
            {props.children}
        </UserContext.Provider>
    );
};
