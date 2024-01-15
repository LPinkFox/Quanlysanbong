package com.example.qlsanbong.Controller;

import com.example.qlsanbong.DTO.ChiTietDatSanDTO;
import com.example.qlsanbong.DTO.DonHangDTO;
import com.example.qlsanbong.DTO.NguoiDungDTO;
import com.example.qlsanbong.DTO.SanBongDTO;
import com.example.qlsanbong.Model.NguoiDung;
import com.example.qlsanbong.Model.SanBong;
import com.example.qlsanbong.Model.SanPham;
import com.example.qlsanbong.Service.AdminService;
import com.example.qlsanbong.Service.NguoiDungService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nguoidung")
@CrossOrigin("http://localhost:3000")
public class NguoiDungController {
  @Autowired
  private NguoiDungService nguoiDungService;
  @Autowired
  private AdminService adminService;
  // đăng ký nguời dùng
  @PostMapping("/dangky")
  public ResponseEntity<NguoiDung> dangkyNguoiDung(@RequestBody NguoiDung nguoiDung){
    return nguoiDungService.dangkyNguoiDung(nguoiDung);
  }
  @PostMapping("/dangnhap")
  public ResponseEntity<NguoiDung> dangnhapNguoiDung(@RequestBody NguoiDungDTO nguoiDungDTO){
    return nguoiDungService.dangnhapNguoiDung(nguoiDungDTO.getSdt(), nguoiDungDTO.getPassword());
  }

  @GetMapping("/sanpham")
  public List<SanPham> danhSachSanPham(){
    return nguoiDungService.danhSachSanPham();
  }
  @GetMapping("/sanbong")
  public List<SanBong> danhSachSanBong(){
    return nguoiDungService.danhsachSanBong();
  }

  @PostMapping("/donhang/{id}")
  public ResponseEntity<String> donHangNguoiDung( @PathVariable Long id, @RequestBody DonHangDTO donHangDTO){
    return nguoiDungService.donHangNguoiDung(id, donHangDTO);
  }
  @PutMapping("/thaydoimatkhau")
  public ResponseEntity<NguoiDung> thayDoiMatKhau(@RequestParam String sdt, @RequestParam String matkhauMoi){
    return nguoiDungService.thayDoiMatKhau(sdt, matkhauMoi);
  }
  @GetMapping("/sandadat")
  public List<ChiTietDatSanDTO> danhSachSanDaDat(){
    return adminService.danhSachSanDat();
  }
}
