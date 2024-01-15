package com.example.qlsanbong.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Data
@Table(name = "san_pham")
public class SanPham {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_san_pham")
  private Long id;

  @Column(name = "ten_san_pham")
  private String tenSanPham;

  @Column(name = "gia_ban")
  private int giaBan;

  @Column(name = "so_luong_kho")
  private int soLuongKho;

}
