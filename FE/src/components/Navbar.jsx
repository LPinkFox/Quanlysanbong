import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { ShoppingCart, User, UserGear, SignOut } from "phosphor-react"
import { UserContext } from "../contexts/UserContext"
import { RentContext } from "../contexts/RentContext"
import { ShopContext } from "../contexts/ShopContext"
import "./Navbar.css"
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, resetUserContext } = useContext(UserContext);
    const { resetShopContext } = useContext(ShopContext);
    const { resetRentContext } = useContext(RentContext);
    const handleLogout = () => {
        resetUserContext();
        resetShopContext();
        resetRentContext();
    }
    return (
        <nav>
            <NavLink className="my-navbar-title" to="/homepage">Sân Bóng Bách Khoa</NavLink>
            <ul className='my-navbar-text-item'>
                <li>
                    <NavLink to="/shop">Cửa Hàng</NavLink>
                </li>
                <li>
                    <NavLink to="/rent">Thuê sân</NavLink>
                </li>
                <li>
                    <NavLink to={'/cart'}>
                        <ShoppingCart size={28} />
                    </NavLink>
                </li>
                <li>
                    <User className='my-user-icon' size={32} weight="thin" onClick={() => { setOpen(!open) }} />
                </li>
                <div className={`my-sub-menu-wrap ${open ? 'active' : 'inactive'}`}>
                    <div className="my-sub-menu">
                        <div className="my-user-info">
                            <h3>{user.hoTen}<br /><span>user</span></h3>
                        </div>
                        <hr />
                        <div className="my-sub-menu-link">
                            <NavLink className={'lp'}>
                                <UserGear size={32} weight="thin" />
                                <h5 className='lp2'>Thông tin người dùng</h5>
                            </NavLink>
                            <span></span>
                        </div>
                        <div className="my-sub-menu-link">
                            <NavLink to='/' className={'lp'} onClick={handleLogout}>
                                <SignOut size={32} weight="thin" />
                                <h5 className='lp2'>Đăng xuất</h5>
                            </NavLink>
                            <span></span>
                        </div>

                    </div>

                </div>

            </ul>
        </nav>

    )
}

export default Navbar