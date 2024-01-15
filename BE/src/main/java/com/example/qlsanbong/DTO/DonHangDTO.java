package com.example.qlsanbong.DTO;

import com.example.qlsanbong.Model.SanBong;
import com.example.qlsanbong.Model.SanPham;
import java.util.List;
import lombok.Data;

@Data
public class DonHangDTO {
  private List<SanPhamDTO> donHangSanPham;
  private List<SanBongDTO> donHangSanBong;
}
