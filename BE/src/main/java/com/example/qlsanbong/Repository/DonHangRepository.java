package com.example.qlsanbong.Repository;

import com.example.qlsanbong.Model.DonHang;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DonHangRepository extends JpaRepository<DonHang, Long> {
  @Query("select dh from DonHang dh where dh.nguoiDung.sdt like lower(concat('%', ?1,'%')) ")
  List<DonHang> findByNguoiDung_Sdt(String sdt);
  @Query("select dh from DonHang dh order by dh.ngayTao desc")
  List<DonHang> findAllDonHang();
  @Query("select sum(dh.tongTien) from DonHang dh where dh.trangThai = ?1  ")
  long doanhThu(String trangthai);
}
