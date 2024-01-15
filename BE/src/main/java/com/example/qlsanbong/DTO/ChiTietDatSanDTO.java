package com.example.qlsanbong.DTO;

import jakarta.persistence.Tuple;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChiTietDatSanDTO {
  private String hoTen;
  private String sdt;
  private String tenSan;
  private int kip;
  private LocalDate ngay;
  private Long idSanBong;
}
