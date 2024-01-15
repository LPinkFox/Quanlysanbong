package com.example.qlsanbong.Controller;

import com.example.qlsanbong.DTO.ChiTietDatSanDTO;
import com.example.qlsanbong.Model.ChiTietDatSan;
import com.example.qlsanbong.Model.ChiTietDonHang;
import com.example.qlsanbong.Model.DonHang;
import com.example.qlsanbong.Model.NguoiDung;
import com.example.qlsanbong.Model.SanBong;
import com.example.qlsanbong.Model.SanPham;
import com.example.qlsanbong.Service.AdminService;
import com.example.qlsanbong.Service.NguoiDungService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
  @Autowired
  AdminService adminService;
  @Autowired
  NguoiDungService nguoiDungService;

  @GetMapping("/sanpham")
  public List<SanPham> danhsachSanPham(){
    return nguoiDungService.danhSachSanPham();
  }
  @GetMapping("/sanbong")
  public List<SanBong> danhsachSanBong(){
    return nguoiDungService.danhsachSanBong();
  }

  @PostMapping("/themsanpham")
  public String themSanPham(@RequestBody SanPham sanPham){
    return adminService.themSanPham(sanPham);
  }

  @DeleteMapping("/xoasanpham/{id}")
  public String xoaSanPham(@PathVariable Long id){
    return adminService.xoaSanPham(id);
  }

  @GetMapping("/taikhoan")
  public List<NguoiDung> danhSachTaiKhoan(){
    return adminService.danhSachTaiKhoanUser();
  }
  @GetMapping("/taikhoanadmin")
  public List<NguoiDung> danhSachTaiKhoanA(){
    return adminService.danhSachTaiKhoanAdmin();
  }

  @GetMapping("/danhsachdonhang")
  public List<DonHang> danhSachDonHang(){
    return adminService.danhSachDonHang();
  }
  @GetMapping("/donhang/{id}")
  public DonHang donHangNguoiDung(@PathVariable Long id){
    return adminService.donHangNguoiDung(id);
  }
  @GetMapping("/chitietdonhang/{id}")
  public List<ChiTietDonHang> chiTietDonHang(@PathVariable Long id){
    return adminService.chiTietDonHang(id);
  }
  @GetMapping("/chitietdatsan/{id}")
  public List<ChiTietDatSan> chiTietDatSan(@PathVariable Long id){
    return adminService.chiTietDatSan(id);
  }
  @GetMapping("/doanhthu")
  public long doanhThu(){
    return adminService.doanhThu();
  }
  @PostMapping("/capnhattrangthai/{id}")
  public String capNhatTrangThai(@PathVariable Long id){
    return adminService.capNhatTrangThai(id);
  }

  @GetMapping("/danhsachdonhang/sdt")
  public List<DonHang> danhsachDonHangSdt(@RequestParam String sdt){
    return adminService.danhSachDonHangSdt(sdt);
  }
  @GetMapping("/thongke")
  public List<Long> demDuLieu(){
    return adminService.demDuLieu();
  }
  @GetMapping("/sanbongduocdat")
  public List<ChiTietDatSanDTO> danhSachSanDat(){
    return adminService.danhSachSanDat();
  }
  @PostMapping("/capnhatsanpham/{id}")
  public String capNhatSanPham(@PathVariable Long id, @RequestParam int gia, @RequestParam int sl){
    return adminService.capNhatSanPham(id, gia, sl);
  }
  @PostMapping("/capnhatsanbong/{id}")
  public String capNhatSanBong(@PathVariable Long id, @RequestParam int gia){
    return adminService.capNhatSanBong(id, gia);
  }

}
