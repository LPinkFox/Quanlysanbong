import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
export default function TrangChu() {
  const [donhang, setDonhang] = useState([])
  const [thongke, setThongke] = useState([])
  useEffect(() => {
    loadData();
  }, [])
  const loadData = async () => {
    const result = await axios.get("http://localhost:8080/api/admin/danhsachdonhang")
    const result1 = await axios.get("http://localhost:8080/api/admin/thongke")
    setDonhang(result.data);
    setThongke(result1.data)
  }
  const donhangrecent = donhang.slice(0, 5)
  return (
    < >
      <Navbar />
      <div className='' style={{height : '90vh'}}>
      <div className='container-fluid p-5'>
        <div className='row g-3 my-2'>
          <div className='col-md-2 '>
            <div className='d-flex justify-content-around align-items-center p-3 bg-white shadow-sm border'>
              <div>
                <h3 className='fs-2'>{thongke[0]}</h3>
                <p className='fs-5'>Sản Phẩm</p>
              </div>
              <i className='bi bi-box-seam p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='d-flex justify-content-around align-items-center p-3 bg-white shadow-sm border'>
              <div>
                <h3 className='fs-2'>{thongke[1]}</h3>
                <p className='fs-5'>Sân Bóng</p>
              </div>
              <i className='bi bi-bookshelf p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='d-flex justify-content-around align-items-center p-3 bg-white shadow-sm border'>
              <div>
                <h3 className='fs-2'>{thongke[2]}</h3>
                <p className='fs-5'>Tài Khoản</p>
              </div>
              <i className='bi bi-person p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='d-flex justify-content-around align-items-center p-3 bg-white shadow-sm border'>
              <div>
                <h3 className='fs-2'>{thongke[3]}</h3>
                <p className='fs-5'>Đơn Hàng</p>
              </div>
              <i className='bi bi-cart2 p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='d-flex justify-content-around align-items-center p-3 bg-white shadow-sm border'>
              <div>
                <h3 className='fs-2'>{Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(thongke[4])}</h3>
                <p className='fs-5'>Doanh Thu</p>
              </div>
              <i className='bi bi-coin p-3 fs-1'></i>
            </div>
          </div>
        </div>
        <table className="container table caption-top border shadow mt-5">
        <caption className='fs-4 text-dark'>Đơn đặt hàng gần đây</caption>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Người Đặt</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {
            donhangrecent.map((donhang, index) => (
              <tr>
                <th scope="row" key={index}>{index + 1}</th>
                <td>{donhang.nguoiDung.sdt}</td>
                <td>{donhang.nguoiDung.hoTen}</td>
                <td>{moment(donhang.ngayTao).format('D/M/Y H:mm:ss')}</td>
                <td>{donhang.tongTien}</td>
                <td>{donhang.trangThai}</td>
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
