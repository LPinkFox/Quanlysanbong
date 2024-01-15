
import './App.css';
import React, {useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginSignup from './pages/LoginSignup'
import { UserContext, UserContextProvider } from './contexts/UserContext';
import { ShopContextProvider } from './contexts/ShopContext';
import { RentContextProvider } from './contexts/RentContext'
import AdminRoute from './AdminRoute';
import UserRoutes from './UserRoutes';
function App() {
  return (
    <div>
      <ShopContextProvider>
        <UserContextProvider>
          <RentContextProvider>
            <Router>
              <Routes>
                <Route path='/' element={<LoginSignup />}></Route>
                <Route path='/*' element={<UserRoutes/>}></Route>
                <Route path='/admin/*' element={<AdminRoute/>}></Route>
              </Routes>
            </Router>
          </RentContextProvider>
        </UserContextProvider>
      </ShopContextProvider>

    </div>
  );
}

export default App;
