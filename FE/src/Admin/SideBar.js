import React, { useState } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const [active, setActive] = useState(0)

  return (
    <div className='sidebar d-flex justify-content-between flex-column text-white p-3 min-vh-100 flex-grow' style={{backgroundColor: '#11235A'}}>
      <div>
          <div className='p-1'>
            <i className='bi bi-code-slash fs-4 me-4 '></i>
            <span className='fs-4'>Quản Lý</span>
          </div>
          <hr className='text-white mt-2'/>
          <ul className='nav nav-pills flex-column mt-3'>
          <li className={active ===1? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(1)}>
              <Link to = '/admin' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-house-door me-3 fs-4'></i>
                <span className='fs-4'>Trang Chủ</span>
              </Link>
            </li>
            <li className={active ===2? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(2)}>
              <Link to = '/admin/sanpham' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-box me-3 fs-4'></i>
                <span className='fs-4'>Sản Phẩm</span>
              </Link>
            </li>
            <li className={active ===7? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(7)}>
              <Link to = '/admin/sanbong' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-bookshelf me-3 fs-4'></i>
                <span className='fs-4'>Sân Bóng</span>
              </Link>
            </li>
            <li className={active ===3? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(3)}>
              <Link to = '/admin/sandat' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-building me-3 fs-4'></i>
                <span className='fs-4'>Sân Đặt</span>
              </Link>
            </li>
            <li className={active ===4? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(4)}>
              <Link to = '/admin/taikhoan' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-people me-3 fs-4'></i>
                <span className='fs-4'>Tài Khoản</span>
              </Link>
            </li>
            <li className={active ===5? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(5)}>
              <Link to = '/admin/donhang' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-cart3 me-3 fs-4'></i>
                <span className='fs-4'>Đơn Hàng</span>
              </Link>
            </li>
            <li className={active ===6? 'active-sidebar nav-item p-2' :'nav-item p-2'} onClick={e => setActive(6)}>
              <Link to = '/admin/doanhthu' className='p-1 d-flex text-decoration-none text-white'>
                <i className='bi bi-bar-chart me-3 fs-4'></i>
                <span className='fs-4'>Doanh Thu</span>
              </Link>
            </li>
          </ul>
      </div>
      <div>
        <hr className='text-white'></hr>
        <div className='nav-item p-2'>
              <div className='p-1' >
                <i className='bi bi-person-circle me-3 fs-4'></i>
                <span className='fs-4'>Nam Đoàn</span>
              </div>
        </div>
      </div>

    </div>
  )
}
