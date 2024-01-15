import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function SanPham() {
    const [sanpham, setSanPham] = useState([])
    const [gia, setGia] = useState(0);
    const [sl, setSL] = useState(0);
    const [check, setCheck] = useState(0);
    const [sp, setSp] = useState('');

    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/api/admin/sanpham")
        setSanPham(result.data);
    }
    const handleClick = (sanpham) => {
        setCheck(1);
        setSp(sanpham);
        setGia(sanpham.giaBan)
        setSL(sanpham.soLuongKho)
    }
    const handleSet = async()=>{
        const result  = await axios.post(`http://localhost:8080/api/admin/capnhatsanpham/${sp.id}`,null, {params : {gia : gia, sl : sl}})
        setCheck(0);
        setSp('')
        if(result.data === "Cập nhật thành công") alert("Cập nhật thành công")
        else alert("Cập nhật thất bại")
        loadData();
    }

    return (
        <>
            <Navbar />
            <div className='container' style={{ height: '90vh' }}>
                <div className='p-2 d-flex'>
                    <table className="table caption-top border shadow mx-2 ">
                        <caption className='text-center h2 '> Sản phẩm</caption>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Giá Bán</th>
                                <th scope="col">Số Lượng Kho</th>
                                <th scope="col">Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sanpham.map((sanpham, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{sanpham.tenSanPham}</td>
                                        <td>{sanpham.giaBan}</td>
                                        <td>{sanpham.soLuongKho}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => handleClick(sanpham)}>Cập nhật</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <h2 className='text-center'>Cập nhật sản phẩm : {sp.tenSanPham} </h2>
                {check ? (<div className="input-group w-50 mb-3 mx-auto">
                    <caption>Nhập giá mới</caption>
                    <input
                        type="number"
                        className="form-control mx-2"
                        placeholder="Cập nhật giá"
                        value={gia}
                        required
                        onChange={(e) => setGia(e.target.value)}
                    />
                    <caption>Nhập số lượng mới</caption>
                    <input
                        type="number"
                        className="form-control mx-2"
                        placeholder="Cập nhật số lượng"
                        value={sl}
                        required
                        onChange={(e) => setSL(e.target.value)}
                    />
                    <div className="input-group-append mx-2">
                        <button className="btn btn-primary" onClick={handleSet} >Cập nhật</button>
                    </div>
                </div>) : null
                }
            </div>
        </>
    )
}
