package app.service;

import app.entity.Conversation;
import app.entity.User;
import app.repository.ConversationRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public ConversationService(ConversationRepository conversationRepository1, UserRepository userRepository) {
        this.conversationRepository = conversationRepository1;
        this.userRepository = userRepository;
    }

    public List<Conversation> getAllConversationByName(String name) {
        name = name.replaceAll("^\"|\"$", "");
        User user = userRepository.findByName(name.trim()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Conversation> allConversations = conversationRepository.findAll();
        List<Conversation> participatinConversation = new ArrayList<>();

        for (Conversation conversation : allConversations) {
            conversation.getUsers().forEach(
                    user1 -> {
                        if (user1.getName().equals(user.getName())) {
                            participatinConversation.add(conversation);
                        }
                    }
            );
        }

        return participatinConversation;
    }
}
