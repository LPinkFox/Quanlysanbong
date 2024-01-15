import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
export default function DonHang() {
    const [donhang, setDonhang] = useState([])
    const [curPage, setcurPage] = useState(1);
    const[searchTerm, setSearchTerm] = useState('')
    const idLast = curPage * 10;
    const idFist = idLast - 10;
    const curDonhang = donhang.slice(idFist, idLast);
    const checkPage = donhang.length > 10
    const handleSearch = async()=>{
        const result = await axios.get("http://localhost:8080/api/admin/danhsachdonhang/sdt", {params :{sdt : searchTerm}})
        setDonhang(result.data)
    }
    const handlePageChange = (pageNum) => {
        setcurPage(pageNum);
    }
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/api/admin/danhsachdonhang")
        setDonhang(result.data);
    }
    const CapnhatTrangThai = async (id_donhang) => {
        await axios.post(`http://localhost:8080/api/admin/capnhattrangthai/${id_donhang}`)
        loadData();
    }
    return (
        <>
            <Navbar />
            <div className='container ' style={{ height: '90vh' }}>
                <h2 className='text-center p-2'>Danh sách đơn hàng</h2>
                <div className="input-group w-50 mb-3 mx-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo số điện thoại"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append mx-2">
                        <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                    </div>
                </div>    
                    <div className='p-2'>
                        <table className="table caption-top border shadow ">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Người Đặt</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Trạng thái thanh toán</th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    curDonhang.map((donhang, index) => (
                                        <tr>
                                            <th scope="row" key={index}>{index + 1 + idFist}</th>
                                            <td>{donhang.nguoiDung.sdt}</td>
                                            <td>{donhang.nguoiDung.hoTen}</td>
                                            <td>{moment(donhang.ngayTao).format('D/M/Y H:mm:ss')}</td>
                                            <td>{donhang.tongTien}</td>
                                            <td>{donhang.trangThai}</td>
                                            <td>
                                                <div>
                                                    <button className='btn btn-success mx-2' onClick={() => CapnhatTrangThai(donhang.id)}>
                                                        Thành công
                                                    </button>
                                                    <Link className='btn btn-primary mx-2 ' to={`/admin/donhang/${donhang.id}`}>
                                                        Chi tiết
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {checkPage ? (<div className='d-flex justify-content-center '>
                            <Pagination
                                activePage={curPage}
                                itemsCountPerPage={10}
                                totalItemsCount={donhang.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                        ) : null}
                    </div>
                </div>
            </>
            )
}
