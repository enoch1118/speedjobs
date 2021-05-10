package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.dto.message.MessageRequest;
import com.jobseek.speedjobs.dto.message.MessageResponse;
import com.jobseek.speedjobs.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

	private final ChatService chatService;

	@MessageMapping("/message")
	public void saveMessage(MessageRequest messageRequest) {
		chatService.saveMessage(messageRequest);
	}

	@GetMapping("/api/chat/{roomId}")
	public ResponseEntity<Page<MessageResponse>> findAll(@PathVariable Long roomId,
		Pageable pageable) {
		return ResponseEntity.ok().body(chatService.findAll(roomId, pageable));
	}
}