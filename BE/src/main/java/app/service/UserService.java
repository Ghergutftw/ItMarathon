package app.service;

import app.dto.Response;
import app.dto.SignUpDTO;
import app.dto.UpdatePasswordDTO;
import app.dto.UserDTO;
import app.entity.User;
import app.enums.ROLES;
import app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public UserService(UserRepository userRepository, ModelMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public ResponseEntity<Response> checkNameExists(String name) {
        Optional<User> user = userRepository.findByName(name);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("success", "Username exits"));
        }
        return ResponseEntity.ok(new Response("failed", "Username does not exist"));
    }

    public ResponseEntity<Response> createUser(SignUpDTO sign) {
        User user = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(sign.getPassword());

        user.setRole(ROLES.USER);
        user.setPassword(encodedPassword);
        user.setName(sign.getName());
        user.setEmail(sign.getEmail());

        userRepository.save(user);

        Response response = new Response("success", "User created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public ResponseEntity<Response> updatePassword(UpdatePasswordDTO updatePasswordDTO) {
        Optional<User> user = userRepository.findByName(updatePasswordDTO.getName());
        if (user.isPresent()) {
            User existingUser = user.get();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(updatePasswordDTO.getNewPassword());
            existingUser.setPassword(encodedPassword);
            userRepository.save(existingUser);
            return ResponseEntity.ok(new Response("success", "Password updated successfully"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response("failed", "User not found"));
    }

    public Response login(SignUpDTO userToCheck) {
        Optional<User> user = userRepository.findByName(userToCheck.getName());
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

            Type setType = new TypeToken<Set<UserDTO>>() {
            }.getType();
            Set<UserDTO> friendsDto = mapper.map(updatedUser.getFriends(), setType);
            Set<UserDTO> friendRequestsDto = mapper.map(updatedUser.getFriendRequests(), setType);

            return new UserDTO(
                    updatedUser.getId(),
                    updatedUser.getName(),
                    updatedUser.getPassword(),
                    updatedUser.getEmail(),
                    updatedUser.getRole(),
                    updatedUser.getBanned(),
                    updatedUser.getMessageSent(),
                    friendsDto,
                    friendRequestsDto,
                    updatedUser.getConversations(),
                    updatedUser.getCoins(),
                    updatedUser.getPremium()
            );
        } else {
            return null;
        }
    }

    public Response logout() {
        // Implement logout logic here
        return new Response("success", "Logout successful");
    }
}
