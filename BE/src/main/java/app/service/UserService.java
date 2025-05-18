package app.service;

import app.dto.Response;
import app.dto.SignUpDTO;
import app.dto.UserDTO;
import app.entity.User;
import app.repository.UserRepository;
import app.enums.ROLES;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public Response createUser(SignUpDTO sign) {
        User user = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(sign.getPassword());
        if (user.getRole() == null) {
            user.setRole(ROLES.USER);
        }
        user.setPassword(encodedPassword);
        user.setName(sign.getName());
        user.setEmail(sign.getEmail());

        userRepository.save(user);

        return new Response("success", "User created successfully");
    }

    public Response login(SignUpDTO userToCheck) {
        Optional<User> user = userRepository.findByEmail(userToCheck.getEmail());
        if (user.isPresent()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(userToCheck.getPassword(), user.get().getPassword())) {
                return new Response("success", "Login successful");
            }
        }
        return new Response("failed", "Wrong credentials");
    }

    public Response deleteUser(UUID id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return new Response("success", "User deleted successfully");
        } else {
            return new Response("failed", "User not found");
        }
    }

    public UserDTO updateUser(int id, User user) {
        Optional<User> userToUpdate = userRepository.findById(UUID.fromString(String.valueOf(id)));
        if (userToUpdate.isPresent()) {
            User updatedUser = userToUpdate.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            userRepository.save(updatedUser);
            return new UserDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail(), updatedUser.getRole(), updatedUser.getCoins(), updatedUser.getPremium());
        } else {
            return null;
        }
    }

    public Response logout() {
        // Implement logout logic here
        return new Response("success", "Logout successful");
    }
}
