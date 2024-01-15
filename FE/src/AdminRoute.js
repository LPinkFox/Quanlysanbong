import React, {useContext} from 'react'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import SideBar from './Admin/SideBar'
import TrangChu from './Admin/TrangChu'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import SanPham from './Admin/Sanpham'
import SanBong from './Admin/SanBong'
import TaiKhoan from './Admin/TaiKhoan'
import DonHang from './Admin/DonHang'
import DoanhThu from './Admin/DoanhThu'
import ChiTietDonHang from './Admin/ChiTietDonHang'
import TaiKhoanAdmin from './Admin/TaiKhoanAdmin'
import SanDat from './Admin/SanDat'
import { UserContext } from './contexts/UserContext'

function AdminRoute() {
  const{isLoggedin} = useContext(UserContext)
  if(!isLoggedin) {
    return <Navigate to='/'/>
  }
  return (
    <div className='d-flex min-vh-100'>
      <div className='w-auto'>
        <SideBar/>
      </div>
      <div className='col overflow-auto'>
          <Routes>
            <Route path='/' element = {<TrangChu/>}/>
            <Route path='/sanpham' element = {<SanPham/>}/>
            <Route path='/sanbong' element = {<SanBong/>}/>
            <Route path='/sandat' element= {<SanDat/>}/>
            <Route path='/taikhoan' element = {<TaiKhoan/>}/>
            <Route path='/donhang' element = {<DonHang/>}/>
            <Route path='/doanhthu' element = {<DoanhThu/>}/>
            <Route path='/donhang/:id' element = {<ChiTietDonHang/>}/>
            <Route path='/taikhoanadmin' element = {<TaiKhoanAdmin/>}/>
          </Routes>
      </div>
    </div>

  )
}

export default AdminRoute