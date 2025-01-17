package com.jobseek.speedjobs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobseek.speedjobs.dto.banner.BannerResponses;
import com.jobseek.speedjobs.service.BannerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"Banner"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/banner")
public class BannerController {

	private final BannerService bannerService;

	@ApiOperation(value = "배너 등록", notes = "배너를 등록한다.")
	@PostMapping("")
	public ResponseEntity<BannerResponses> save(@RequestPart List<MultipartFile> files) {
		return ResponseEntity.ok().body(bannerService.save(files));
	}

	@ApiOperation(value = "배너 조회", notes = "배너를 조회한다.")
	@GetMapping("")
	public ResponseEntity<BannerResponses> read() {
		return ResponseEntity.ok().body(bannerService.read());
	}

	@ApiOperation(value = "배너 삭제", notes = "배너를 삭제한다.")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
		bannerService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
