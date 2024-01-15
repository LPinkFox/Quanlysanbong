import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Products from '../Products';
import { ShopContext } from '../contexts/ShopContext';
import { UserContext } from '../contexts/UserContext';
import { RentContext } from '../contexts/RentContext';
import { CartItem } from './CartItem';
import { YardItem } from './YardItem';
import Paymentdia from '../components/Paymentdia';
import "./cart.css"; // Updated CSS file name
const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return isNaN(new Date(formattedDate).getTime()) ? "Invalid Date" : formattedDate;
};
const Cart = () => {
    const { cartItems, getTotalCartAmount} = useContext(ShopContext);
    const { rentedYard, getTotalAmountYard} = useContext(RentContext);
    const { user } = useContext(UserContext);
    const [openPaymentDia, setOpenPaymentDia] = useState(false);
    const dataToSend = {
        donHangSanPham: Object.values(cartItems)
            .filter(item => item.soLuong > 0)
            .map(item => ({
                id: item.id,
                soLuongMua: item.soLuong,
            })),
        donHangSanBong: rentedYard.map(yard => ({
            id: yard.id,
            kip: yard.kip,
            ngay: formatDate(yard.date),
        })),
    };
    // console.log("dataToSend", dataToSend);

    const handlepay = () => {
        if (Object.values(cartItems).filter(item => item.soLuong > 0).length === 0 && rentedYard.length === 0) {
            alert("Giỏ Hàng Trống");
            return;
        }
        if (!openPaymentDia) {
            setOpenPaymentDia(true);
            console.log("openPaymentDia", openPaymentDia);
            return;
        }
    };
    return (
        <>
            <Navbar />
            {   
                openPaymentDia ? 
                    <Paymentdia data={dataToSend} setOpenPaymentDia={setOpenPaymentDia} id={user.id} sum={(getTotalCartAmount() + getTotalAmountYard())}/>
                :
                <div className='my-cart'> {/* Updated className */}
                    <h1 className='my-cart-title'>Giỏ Hàng</h1>
                    <div className="my-cartItems"> {/* Updated className */}
                        {cartItems.map((item) => {
                            if (item.soLuong !== 0) {
                                return <CartItem data={item} />
                            }
                        })}
                    </div>
                    <div className="my-yardItems"> {/* Updated className */}
                        {rentedYard.map((yard) => {
                            return <YardItem data={yard} />
                        })}
                    </div>
                    <div className="my-checkout"> {/* Updated className */}
                        <p className='my-cart-total-bill'>Tổng tiền: {(getTotalCartAmount() + getTotalAmountYard()).toLocaleString()} VND</p>
                        <button className='my-cart-button-pay' onClick={() => {
                            handlepay();
                        }}>Thanh Toán</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Cart;
