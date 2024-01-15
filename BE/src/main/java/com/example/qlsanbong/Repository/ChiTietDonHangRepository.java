package com.example.qlsanbong.Repository;

import com.example.qlsanbong.Model.ChiTietDonHang;
import com.example.qlsanbong.Model.DonHang;
import com.example.qlsanbong.Model.NguoiDung;
import com.example.qlsanbong.Model.SanPham;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, Long> {
  @Query("select c from ChiTietDonHang c join fetch c.sanPham where c.donHang.id = ?1")
  List<ChiTietDonHang> findByDonHang(Long donHangId);
}