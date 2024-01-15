import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Label, LabelList } from 'recharts';

export default function DoanhThu() {
  const [doanhthu, setDoanhthu] = useState([]);
  const [doanhthuthang, setDoanhthuthang] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get("http://localhost:8080/api/admin/danhsachdonhang")
    const transformedData = [];
    const transformedData1 = Array.from({ length: 12 }, (_, monthIndex) => {
      const month = monthIndex + 1;
      return { ngayTao: month, Amount: 0 };
    });
    result.data.reverse();//do ban dau lay giu lieu nguoc
    const formatData = result.data;
    for (let i = 0; i < formatData.length; i++) {
      formatData[i].ngayTao = moment(formatData[i].ngayTao).format('D/M')
    }
    console.log(formatData);
    for (let i = 0; i < formatData.length; i++) {
      const curr = formatData[i];
      const Khoangcach = moment().diff(moment(curr.ngayTao), 'days')
      if (curr.trangThai === 'Chưa thanh toán') continue;
      let exist = -1;
      for (let j = 0; j < transformedData.length; j++) {
        if (transformedData[j].ngayTao === curr.ngayTao) {
          exist = j;
          break;
        }
      }
      if (exist !== -1) {
        transformedData[exist].Amount += curr.tongTien
      } else {
        transformedData.push({ ngayTao: curr.ngayTao, Amount: curr.tongTien });
      }
    }
    setDoanhthu(transformedData);
    for (let i = 0; i < formatData.length; i++) {
      const curr = formatData[i];
      const monthIndex = moment(curr.ngayTao, 'D/M').month();
      if (curr.trangThai === 'Chưa thanh toán') continue;
      transformedData1[monthIndex].Amount += curr.tongTien;
    }
    setDoanhthuthang(transformedData1)
    ///Doanh thu theo thang
  };

  return (
    <>
      <Navbar />
      <div className='container-fluid' style={{ height: '90vh' }}>
      <div className=' d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
        <div className='d-flex flex-column mx-5 '>
          <LineChart width={500} height={400} data={doanhthu}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ngayTao" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Amount" stroke="#8884d8" activeDot={{ r: 8 }} name='Việt Nam Đồng'>
            </Line>
          </LineChart>
          <h4 className='my-4 text-center'> Biểu đồ Doanh thu theo ngày</h4>
        </div>
        <div className='d-flex flex-column mx-5'>
          <LineChart width={500} height={400} data={doanhthuthang}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ngayTao" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Amount" stroke="#8884d8" activeDot={{ r: 8 }} name='Việt Nam Đồng'>
            </Line>
          </LineChart>
          <h4 className='my-4 text-center'> Biểu đồ Doanh thu theo tháng</h4>
        </div>
      </div>
      </div>
    </>
  )
}
