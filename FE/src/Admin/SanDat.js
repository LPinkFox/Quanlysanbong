import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import moment from 'moment';

export default function SanDat() {
    const [sanbong, setSanBong] = useState([]);

    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/api/admin/sanbongduocdat")
        setSanBong(result.data)
        console.log(result.data)
    }

    return (
        <>
            <Navbar />
            <div className='container ' style={{ height: '90vh' }}>
                <h2 className='text-center p-2'>Danh sách Sân bóng được đặt</h2>
                <div className='p-2'>
                    <table className="table caption-top border shadow">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Tên sân</th>
                                <th scope="col">Kíp</th>
                                <th scope="col">Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sanbong.map((sanbong, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{sanbong.hoTen}</td>
                                        <td>{sanbong.sdt}</td>
                                        <td>{sanbong.tenSan}</td>
                                        <td>{sanbong.kip}</td>
                                        <td>{moment(sanbong.ngay).format('DD/MM/Y')}</td>
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
