import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Rent from './pages/Rent'
function UserRoutes() {
    const { isLoggedin } = useContext(UserContext)
    if (!isLoggedin) {
        return <Navigate to='/' />
    }
    return (
        <Routes>
            <Route path='/homepage' element={<HomePage />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/rent' element={<Rent />}></Route>
        </Routes>

    )
}

export default UserRoutes