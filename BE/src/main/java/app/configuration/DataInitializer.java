package app.configuration;

import app.entity.Conversation;
import app.entity.Message;
import app.entity.User;
import app.enums.ROLES;
import app.repository.ConversationRepository;
import app.repository.MessageRepository;
import com.github.jaiimageio.impl.common.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import app.repository.UserRepository;

import java.io.InputStream;
import java.nio.file.Files;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DataInitializer(UserRepository userRepository, ConversationRepository conversationRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        User user1 = new User();
        user1.setName("madalin");
        user1.setPassword(passwordEncoder.encode("ghergut"));
        user1.setRole(ROLES.ADMIN);


        User user2 = new User();
        user2.setName("bianca");
        user2.setPassword(passwordEncoder.encode("haidau"));
        user2.setRole(ROLES.ADMIN);

        User user3 = new User();
        user3.setName("simona");
        user3.setPassword(passwordEncoder.encode("antal"));
        user3.setRole(ROLES.ADMIN);

        user1.setFriends(Set.of(user1));
        user2.setFriends(Set.of(user3));

        userRepository.saveAll(List.of(user1, user2, user3));

        Message message1 = new Message();
        message1.setTimestamp(Instant.now());
        message1.setFromUser(user1);
        try (InputStream is = ImageUtil.class.getClassLoader().getResourceAsStream("1305B_1306A.png")) {
            if (is == null) {
                throw new IllegalArgumentException("Image not found: 1305B_1306A.png");
            }
            message1.setImageData(is.readAllBytes());
        }

        messageRepository.save(message1);

        Conversation conversation1 = new Conversation();
        conversation1.setName("madalin");
        conversation1.setUsers(List.of(user1, user2));
        conversation1.setMessages(List.of(message1));

        conversationRepository.save(conversation1);

        System.out.println("✅ Database initialized with sample data!");
    }
}