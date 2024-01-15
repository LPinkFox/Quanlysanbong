package com.example.qlsanbong.Service;

import com.example.qlsanbong.DTO.ChiTietDatSanDTO;
import com.example.qlsanbong.DTO.DonHangDTO;
import com.example.qlsanbong.DTO.NguoiDungDTO;
import com.example.qlsanbong.DTO.SanBongDTO;
import com.example.qlsanbong.DTO.SanPhamDTO;
import com.example.qlsanbong.Model.ChiTietDatSan;
import com.example.qlsanbong.Model.ChiTietDonHang;
import com.example.qlsanbong.Model.DonHang;
import com.example.qlsanbong.Model.NguoiDung;
import com.example.qlsanbong.Model.SanBong;
import com.example.qlsanbong.Model.SanPham;
import com.example.qlsanbong.Repository.ChiTietDatSanRepository;
import com.example.qlsanbong.Repository.ChiTietDonHangRepository;
import com.example.qlsanbong.Repository.DonHangRepository;
import com.example.qlsanbong.Repository.NguoiDungRepository;
import com.example.qlsanbong.Repository.SanBongRepository;
import com.example.qlsanbong.Repository.SanPhamRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NguoiDungService {
  @Autowired
  NguoiDungRepository nguoiDungRepository;
  @Autowired
  SanPhamRepository sanPhamRepository;
  @Autowired
  SanBongRepository sanBongRepository;
  @Autowired
  ChiTietDonHangRepository chiTietDonHangRepository;
  @Autowired
  ChiTietDatSanRepository chiTietDatSanRepository;
  @Autowired
  DonHangRepository donHangRepository;

  public ResponseEntity<NguoiDung> dangkyNguoiDung(NguoiDung nguoiDung){
    String sdt = nguoiDung.getSdt();
    if(nguoiDungRepository.findBySdt(sdt) != null){
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }
    nguoiDung.setVaiTro("User");
    nguoiDungRepository.save(nguoiDung);
    return ResponseEntity.status(HttpStatus.OK).body(nguoiDung);
  }

  public ResponseEntity<NguoiDung> dangnhapNguoiDung(String sdt, String password){
    NguoiDung nguoiDung =  nguoiDungRepository.findBySdt(sdt);
    if(nguoiDung == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    if(!nguoiDung.getPassword().equals(password)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    return ResponseEntity.ok(nguoiDung);
  }
  public ResponseEntity<NguoiDung> thayDoiMatKhau(String sdt, String matKhauMoi){
    NguoiDung nguoiDung = nguoiDungRepository.findBySdt(sdt);
    nguoiDung.setPassword(matKhauMoi);
    nguoiDungRepository.save(nguoiDung);
    return ResponseEntity.status(HttpStatus.OK).body(nguoiDung);
  }
  // xem danh sach san pham

  public List<SanPham> danhSachSanPham(){
    return sanPhamRepository.findAll();
  }
  public List<SanBong> danhsachSanBong(){
    return sanBongRepository.findAll();
  }
  // nhap don hang vao co so du lieu
  public ResponseEntity<String> donHangNguoiDung(Long id, DonHangDTO donHangDTO){
    DonHang donHang = new DonHang();
    int tongTien = 0;

    NguoiDung nguoiDung = nguoiDungRepository.findById(id).orElse(null);
    if(nguoiDung == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thâý người dùng");
    donHang.setNguoiDung(nguoiDung);
    donHang.setNgayTao(new Date());
    donHang.setTrangThai("Chưa thanh toán");
    donHangRepository.save(donHang);

    List<SanPhamDTO> sanPhamDTOS = donHangDTO.getDonHangSanPham();
    for (SanPhamDTO sanPhamDTO: sanPhamDTOS) {
      SanPham sanPham = sanPhamRepository.findById( sanPhamDTO.getId()).orElse(null);
      int soLuongMua = sanPhamDTO.getSoLuongMua();
      tongTien += sanPham.getGiaBan() * soLuongMua;
      sanPham.setSoLuongKho(sanPham.getSoLuongKho()-soLuongMua);
      sanPhamRepository.save(sanPham);
      ChiTietDonHang chiTietDonHang = new ChiTietDonHang();
      chiTietDonHang.setDonHang(donHang);
      chiTietDonHang.setSanPham(sanPham);
      chiTietDonHang.setSoLuongMua(soLuongMua);
      chiTietDonHangRepository.save(chiTietDonHang);
    }

    List<SanBongDTO> sanBongDTOS = donHangDTO.getDonHangSanBong();
    for(SanBongDTO sanBongDTO : sanBongDTOS){
      SanBong sanBong = sanBongRepository.findById( sanBongDTO.getId()).orElse(null);
      ChiTietDatSan chiTietDatSan = new ChiTietDatSan();
      chiTietDatSan.setDonHang(donHang);
      chiTietDatSan.setSanBong(sanBong);
      chiTietDatSan.setKip(sanBongDTO.getKip());
      chiTietDatSan.setNgay(sanBongDTO.getNgay());
      tongTien += sanBong.getGia();
      chiTietDatSanRepository.save(chiTietDatSan);
    }
    donHang.setTongTien(tongTien);
    donHangRepository.save(donHang);
    return ResponseEntity.status(HttpStatus.OK).body("Nhập dữ liệu thành công");
  }
}
