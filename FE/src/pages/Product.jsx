import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
const Product = (props) => {
    const { id, giaBan, soLuongKho, tenSanPham, imgsource } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemCount = cartItems.filter(item => item.id === id)[0].soLuong;
    
    return (
        <div className="my-product">
            <img src={imgsource} />
            <div className="my-description">
                <p>
                    <b>{tenSanPham}</b>
                </p>
                <p>{giaBan + " VND"}</p>
                <p>{"Còn lại: " + soLuongKho}</p>
                <button className='my-addToCartBttn' onClick={() => addToCart(id)}>
                    Thêm vào giỏ hàng {cartItemCount > 0 && <> ({cartItemCount})</>}
                </button>
            </div>
        </div>
    );
}

export default Product;
