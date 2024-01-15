import React, { useContext } from 'react';
import { RentContext } from '../contexts/RentContext';
import { allYard } from '../Yard';
import available from '../assets/Yards/available.png'
export const YardItem = (props) => {
    const { id, date, kip } = props.data;
    const selectedYard = allYard.find((yard) => yard.id === id);
    const {  removeFromCart} = useContext(RentContext);

    return (
        <div className='my-yardItem'> {/* Updated className */}
            <img src={available} className='' />
            <div className="my-description"> {/* Updated className */}
                <h3 className='my-yard-names'>
                    <b>{selectedYard.tenSan}</b>
                </h3>
                <h4>Ngày: {date}</h4>
                <h4>Kíp: {kip}</h4>
                <h4>Giá Thuê: <span style={{color:'red'}}>{selectedYard.gia.toLocaleString()}</span>  VNĐ</h4>
            </div>
            <button className='my-yard-button' onClick={() => removeFromCart(date,kip, id)}>Xóa</button>
        </div>
    );
}
