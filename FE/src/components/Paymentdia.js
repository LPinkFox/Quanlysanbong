import React, { useContext } from "react";
import "./Paymentdia.css";
import { ShopContext } from '../contexts/ShopContext';
import { RentContext } from '../contexts/RentContext';
import { fetchYardData } from '../Yard';
function Paymentdia({ setOpenPaymentDia, data, id, sum }) {
  const { resetShopContext } = useContext(ShopContext);
  const { resetRentContext } = useContext(RentContext);
  const handlePayMent = () => {
    fetch(`http://localhost:8080/api/nguoidung/donhang/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    <div className="my-modalBackground">
      <div className="my-modalContainer">
        <div className="my-titleCloseBtn">
          <button
            onClick={() => {
              setOpenPaymentDia(false);
            }}
          >
            X
          </button>
        </div>
        <div className="my-titleRow">
          <h1>Chuyển khoản số tiền:</h1>
          <h1 className="my-sum">{sum} VNĐ</h1>
        </div>
        <div className="my-body">

          <img className="my-centeredImage" src={require('../assets/QrCode/QR.jpg')}></img>
        </div>
        <div className="my-footer">
          <button
            onClick={() => {
              handlePayMent();
              setOpenPaymentDia(false);
            }}
          >
            Đã Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paymentdia;