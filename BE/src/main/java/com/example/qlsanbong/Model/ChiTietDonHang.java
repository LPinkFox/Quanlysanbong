package com.example.qlsanbong.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_chi_tiet_dh")
  private Long id;

  @Column(name = "so_luong_mua")
  private int soLuongMua;

  @ManyToOne
  @JoinColumn(name = "id_don_hang")
  @JsonBackReference
  @JsonIgnore
  private DonHang donHang;

  @ManyToOne
  @JoinColumn(name = "id_san_pham")
  private SanPham sanPham;

}
