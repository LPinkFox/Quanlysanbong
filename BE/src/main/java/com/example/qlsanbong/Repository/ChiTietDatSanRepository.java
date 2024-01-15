package com.example.qlsanbong.Repository;

import com.example.qlsanbong.DTO.ChiTietDatSanDTO;
import com.example.qlsanbong.Model.ChiTietDatSan;
import com.example.qlsanbong.Model.DonHang;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChiTietDatSanRepository extends JpaRepository<ChiTietDatSan, Long> {
  @Query("select c from ChiTietDatSan c join fetch c.sanBong where c.donHang.id = ?1")
  List<ChiTietDatSan> findByDonHang(Long id);
  @Query("select c from ChiTietDatSan c join fetch c.sanBong")
  List<ChiTietDatSan> findSanDaDat();
  @Query("select c from ChiTietDatSan c join fetch c.sanBong join fetch c.donHang join c.donHang.nguoiDung order by c.ngay desc")
  List<ChiTietDatSan> findDSSanDaDat();
}
