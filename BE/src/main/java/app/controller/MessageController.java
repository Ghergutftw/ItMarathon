package app.controller;

import app.dto.MessageDTO;
import app.entity.Message;
import app.entity.User;
import app.enums.ROLES;
import app.service.MessageService;
import app.service.SteganographyService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final SteganographyService steganographyService;
    private final MessageService messageService;
    private final UserService userService;

    @Autowired
    public MessageController(SteganographyService steganographyService,
                             MessageService messageService,
                             UserService userService) {
        this.steganographyService = steganographyService;
        this.messageService = messageService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(
            @RequestParam("text") String text,
            @RequestParam("image") MultipartFile image) throws IOException {

        Message message = messageService.createMessage(text, image);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessage(@PathVariable UUID id) {
        MessageDTO message = messageService.getMessage(id);
        return ResponseEntity.ok(message);
    }
}