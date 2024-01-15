package com.example.qlsanbong;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Quản Lý Sân Bóng Project"
		)
)
public class QlSanBongApplication {

	public static void main(String[] args) {
		SpringApplication.run(QlSanBongApplication.class, args);
	}

}
