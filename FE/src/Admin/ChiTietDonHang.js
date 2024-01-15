import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function ChiTietDonHang() {
    const { id } = useParams();
    console.log(id)
    const [chitiet1, setChitiet1] = useState([])
    const [chitiet2, setChitiet2] = useState([])
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result1 = await axios.get(`http://localhost:8080/api/admin/chitietdonhang/${id}`)
        const result2 = await axios.get(`http://localhost:8080/api/admin/chitietdatsan/${id}`)
        setChitiet1(result1.data)
        setChitiet2(result2.data)
    }

    return (
        <div className='vh-100'>
            <Navbar />
            <div className='container-fluid'>
                <Link to='/admin/donhang' className='p-1 d-flex text-decoration-none text-dark'>
                    <i className='bi bi-arrow-left fs-4'></i>
                    <span className='fs-4'>Trở về</span>
                </Link>
                <div className='p-5 d-flex'>
                    <table className="table caption-top border shadow mx-5">
                        <caption className='h2 text-center'>Danh sách sản phẩm</caption>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Sản Phẩm</th>
                                <th scope="col">Số lượng mua</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                chitiet1.map((sanpham, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{sanpham.sanPham.tenSanPham}</td>
                                        <td>{sanpham.soLuongMua}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <table className="table caption-top border shadow mx-5">
                        <caption className='h2 text-center'>Danh sách sân bóng</caption>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Sân</th>
                                <th scope="col">Kíp</th>
                                <th scope="col">Ngày</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                chitiet2.map((sanbong, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{sanbong.sanBong.tenSan}</td>
                                        <td>{sanbong.kip}</td>
                                        <td>{moment(sanbong.ngay).format('D/M/Y')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
