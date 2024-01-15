import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';

export const CartItem = (props) => {
    const { id, giaBan, tenSanPham, imgsource, soLuong } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

    return (
        <div className='my-cartItem'> {/* Updated className */}

            <img src={imgsource} />
            <div className="my-description"> {/* Updated className */}
                <h3 className='my-cart-product-name'>
                    <b>{tenSanPham}</b>
                </h3>
                <h4>Giá: <span style={{color:'red'}}>{giaBan.toLocaleString()}</span> VNĐ</h4>
                <div className="my-countHandler"> {/* Updated className */}
                    <button className='my-cart-button' onClick={() => removeFromCart(id)}> - </button>
                    <input className='my-cart-input' value={soLuong} onChange={(e) => updateCartItemCount(e.target.value, id)} />
                    <button className='my-cart-button' onClick={() => addToCart(id)}> + </button>
                </div>
            </div>

        </div>
    );
}
