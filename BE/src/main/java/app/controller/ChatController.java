package app.controller;

import app.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.send") // maps to /app/chat.send
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        return message;
    }
}

