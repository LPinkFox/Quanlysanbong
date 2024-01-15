import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function TaiKhoanAdmin() {
    const [taikhoan, setTaikhoan] = useState([])
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/api/admin/taikhoanadmin")
        setTaikhoan(result.data);
    }
    return (
        <>
            <Navbar />
            <div className='container ' style={{ height: '90vh' }}>
                <div className='p-5'>
                    <h2 className='text-center'>Danh sách tài khoản Admin</h2>
                    <table className="table caption-top border shadow my-5">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col">Mật Khẩu</th>
                                <th scope="col">Vai Trò</th>
                                <th scope="col">Địa Chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taikhoan.map((taikhoan, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{taikhoan.hoTen}</td>
                                        <td>{taikhoan.sdt}</td>
                                        <td>{taikhoan.password}</td>
                                        <td>{taikhoan.vaiTro}</td>
                                        <td>{taikhoan.diaChi}</td>
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
