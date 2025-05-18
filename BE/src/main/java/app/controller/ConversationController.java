package app.controller;

import app.entity.Conversation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import app.service.ConversationService;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/conversation-service")
public class ConversationController {

    private ConversationService conversationService;

    @GetMapping("")
    private List<Conversation> getAllConversations() {
        return null;
    }


}
