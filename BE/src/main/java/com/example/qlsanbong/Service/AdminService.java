package com.example.qlsanbong.Service;

import com.example.qlsanbong.DTO.ChiTietDatSanDTO;
import com.example.qlsanbong.DTO.DonHangDTO;
import com.example.qlsanbong.DTO.SanBongDTO;
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
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
  @Autowired
  SanPhamRepository sanPhamRepository;
  @Autowired
  NguoiDungRepository nguoiDungRepository;
  @Autowired
  DonHangRepository donHangRepository;
  @Autowired
  ChiTietDonHangRepository chiTietDonHangRepository;
  @Autowired
  ChiTietDatSanRepository chiTietDatSanRepository;
  @Autowired
  SanBongRepository sanBongRepository;
  public String themSanPham(SanPham sanPham){
    sanPhamRepository.save(sanPham);
    return "them san pham thanh cong";
  }
  public String xoaSanPham(Long id){
    SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
    if(sanPham == null)  return "Không tìm thấy sản phẩm";
    sanPhamRepository.delete(sanPham);
    return "xoa san pham thanh cong";
  }
  public List<NguoiDung> danhSachTaiKhoanUser(){
    return nguoiDungRepository.findTaiKhoanUser();
  }
  public List<NguoiDung> danhSachTaiKhoanAdmin(){
    return nguoiDungRepository.findTaiKhoanAdmin();
  }
  public List<DonHang> danhSachDonHang(){
    return donHangRepository.findAllDonHang();
  }

  public List<DonHang> danhSachDonHangSdt(String sdt){
    return donHangRepository.findByNguoiDung_Sdt(sdt);
  }
  // tim theo id don hang
  public DonHang donHangNguoiDung(Long id){
    return donHangRepository.findById(id).orElse(null);
  }

  public List<ChiTietDonHang> chiTietDonHang(Long id){
      return chiTietDonHangRepository.findByDonHang(id);
  }
  public List<ChiTietDatSan> chiTietDatSan(Long id){
    return chiTietDatSanRepository.findByDonHang(id);
  }
  // xu ly don hang
  public long doanhThu(){
      return donHangRepository.doanhThu("Đã thanh toán");
  }

  public String capNhatTrangThai(Long id){
    DonHang donHang = donHangRepository.findById(id).orElse(null);
    donHang.setTrangThai("Đã thanh toán");
    donHangRepository.save(donHang);
    return "Cập nhật đơn hàng thành công";
  }
  public List<Long> demDuLieu(){
    List<Long> data = new ArrayList<>();
    data.add(sanPhamRepository.count());
    data.add(sanBongRepository.count());
    data.add(nguoiDungRepository.count());
    data.add(donHangRepository.count());
    data.add(donHangRepository.doanhThu("Đã thanh toán"));
    return data;
  }
  public List<ChiTietDatSanDTO> danhSachSanDat(){
    List<ChiTietDatSan> chiTietDatSans = chiTietDatSanRepository.findDSSanDaDat();
    return chiTietDatSans.stream().map(chiTietDatSan -> {
      return  new ChiTietDatSanDTO(chiTietDatSan.getDonHang().getNguoiDung().getHoTen(), chiTietDatSan.getDonHang().getNguoiDung().getSdt(), chiTietDatSan.getSanBong().getTenSan(), chiTietDatSan.getKip(), chiTietDatSan.getNgay(), chiTietDatSan.getSanBong().getId());
    }).collect(Collectors.toList());
  }
  public String capNhatSanPham(Long id, int gia, int sl){
    SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
    sanPham.setSoLuongKho(sl);
    sanPham.setGiaBan(gia);
    sanPhamRepository.save(sanPham);
    return "Cập nhật thành công";
  }
  public String capNhatSanBong(Long id, int gia){
    SanBong sanBong = sanBongRepository.findById(id).orElse(null);
    sanBong.setGia(gia);
    sanBongRepository.save(sanBong);
    return "Cập nhật thành công";
  }
}
