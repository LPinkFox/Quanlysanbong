import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Products from '../Products';
import { ShopContext } from '../contexts/ShopContext';
import { UserContext } from '../contexts/UserContext';
import { RentContext } from '../contexts/RentContext';
import { CartItem } from './CartItem';
import { YardItem } from './YardItem';
import { fetchYardData } from '../Yard';
import "./cart.css"; // Updated CSS file name
const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return isNaN(new Date(formattedDate).getTime()) ? "Invalid Date" : formattedDate;
};
const Cart = () => {
    const { cartItems, getTotalCartAmount, resetShopContext } = useContext(ShopContext);
    const { rentedYard, getTotalAmountYard, resetRentContext } = useContext(RentContext);
    const { user } = useContext(UserContext);
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
    console.log('Data to send:', JSON.stringify(dataToSend, null, 2));
    const handlepay = () => {
        const userId = user.id;
        if (Object.keys(cartItems).filter(id => cartItems[id] > 0).length === 0 && rentedYard.length === 0) {
            alert("giỏ hàng rỗng");
            return;
        }
        fetch(`http://localhost:8080/api/nguoidung/donhang/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // Handle the response as text
            })
            .then(responseText => {
                console.log('Response from server:', responseText);
                // Check if the responseText contains the success message
                if (responseText === 'Nhập dữ liệu thành công') {
                    resetShopContext();
                    resetRentContext();
                    fetchYardData();
                    // Handle success here, e.g., show a success message to the user
                    alert('Đơn hàng đã được gửi thành công!');
                } else {
                    // Handle unexpected response
                    console.error('Unexpected response:', responseText);
                }
            })
            .catch(error => {
                console.error('Lỗi khi gửi đơn hàng:', error);
                // Handle errors
                alert('Lỗi');
            });
    };
    return (
        <>
            <Navbar />
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
        </>
    );
}

export default Cart;
