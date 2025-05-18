package app.service;

import app.dto.MessageDTO;
import app.entity.Message;
import app.entity.User;
import app.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    private final SteganographyService steganographyService;

    @Autowired
    public MessageService(MessageRepository messageRepository, SteganographyService steganographyService) {
        this.messageRepository = messageRepository;
        this.steganographyService = steganographyService;
    }

    public Message save(Message message) {
        return messageRepository.save(message);
    }


    public Message createMessage(String text, MultipartFile image) throws IOException {

        byte[] encryptedImage = SteganographyService.encryptTextInImage(image.getBytes(), text);
        Message message = new Message();
        message.setImageData(encryptedImage);
        message.setTimestamp(Instant.now());
        return messageRepository.save(message);
    }

    public MessageDTO getMessage(UUID id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Message not found"));

        // Decrypt the text from the image
        String decryptedText = SteganographyService.decryptTextFromImage(message.getImageData());
        return new MessageDTO(
                message.getId(),
                message.getImageData(),
                decryptedText,
                message.getFromUser(),
                message.getToConversation(),
                message.isReported()
        );
    }
}