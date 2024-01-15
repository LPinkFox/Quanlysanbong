import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function SanBong() {
    const [sanbong, setSanBong] = useState([]);
    const [check, setCheck] = useState(0);
    const [giaSan, setGiaSan] = useState(0);
    const [sb, setSb] = useState('');

    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result1 = await axios.get("http://localhost:8080/api/admin/sanbong")
        setSanBong(result1.data);
    }
    const handleClick = (sb) => {
        setCheck(1);
        setSb(sb);
        setGiaSan(sb.gia);
    }
    const handleSet = async () => {
        const result = await axios.post(`http://localhost:8080/api/admin/capnhatsanbong/${sb.id}`, null, { params: { gia: giaSan } })
        setCheck(0);
        setSb('')
        if (result.data === "Cập nhật thành công") alert("Cập nhật thành công")
        else alert("Cập nhật thất bại")
        loadData();
    }

    return (
        <>
            <Navbar />
            <div className='container' style={{ height: '90vh' }}>
                <div className='p-2 d-flex'>
                    <table className="table caption-top border shadow mx-2  ">
                        <caption className='text-center h2'>Sân bóng</caption>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Sân</th>
                                <th scope="col">Giá Bán</th>
                                <th scope="col">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sanbong.map((sanbong, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{sanbong.tenSan}</td>
                                        <td>{sanbong.gia}</td>
                                        <td>
                                            <button className='btn btn-success mx-2' onClick={()=>handleClick(sanbong)}>
                                                Cập nhật
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <h2 className='text-center'>Cập nhật sân bóng : {sb.tenSan} </h2>
                {check ? (<div className="input-group w-50 mb-3 mx-auto">
                    <caption>Nhập giá mới</caption>
                    <input
                        type="number"
                        className="form-control mx-2"
                        placeholder="Cập nhật giá"
                        value={giaSan}
                        required
                        onChange={(e) => setGiaSan(e.target.value)}
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
