import React from 'react'
import Navbar from '../components/Navbar'
import './homepage.css'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <div className='my-homepage-containers'>
        <div className='my-homepage-text-instruction'>
        <h1> Chào mừng mọi người đến với sân bóng Bách Khoa! </h1>
        <h3> Kíp 1: 9h30h - 11h </h3>
        <h3> Kíp 2: 15h - 16h30 </h3>
        <h3> Kíp 3: 17h - 18h30 </h3>
        <h3> Kíp 4: 20h - 21h30 </h3>
        <h1> Hân hạnh được phục vụ quý khách ! </h1>
        </div>
        <img className='my-homepage-img' src="https://img5.thuthuatphanmem.vn/uploads/2021/07/09/hinh-nen-san-van-dong-cup-c1_025305307.jpg" alt="" />
        
        </div>
    </div>
  )
}

export default HomePage