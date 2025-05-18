package app.configuration;

import app.entity.User;
import app.enums.ROLES;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import app.repository.UserRepository;

import java.util.List;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        User user1 = new User();
        user1.setName("Madalin");
        user1.setPassword(passwordEncoder.encode("ghergut"));
        user1.setRole(ROLES.ADMIN);

        User user2 = new User();
        user2.setName("Bianca");
        user2.setPassword(passwordEncoder.encode("haidau"));
        user2.setRole(ROLES.ADMIN);

        User user3 = new User();
        user3.setName("Simona");
        user3.setPassword(passwordEncoder.encode("Antal"));
        user3.setRole(ROLES.ADMIN);

        userRepository.saveAll(List.of(user1, user2, user3));

        System.out.println("✅ Database initialized with sample data!");
    }
}