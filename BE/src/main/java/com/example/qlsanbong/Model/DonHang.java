package com.example.qlsanbong.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.Data;
@Entity
@Data
@Table(name = "don_hang")
public class DonHang {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_don_hang")
  private Long id;

  @Column(name = "tong_tien")
  private int tongTien;

  @Column(name = "ngay_tao_don_hang")
  private Date ngayTao;

  @Column(name = "trang_thai")
  private String trangThai;

  @ManyToOne
  @JoinColumn(name = "id_nguoi_dung")
  private NguoiDung nguoiDung;

  @OneToMany(mappedBy = "donHang")
  @JsonManagedReference
  @JsonIgnore
  private List<ChiTietDonHang> chiTietDonHangs;

  @OneToMany(mappedBy = "donHang")
  @JsonManagedReference
  @JsonIgnore
  private List<ChiTietDatSan> chiTietDatSans;
}
