package app.controller;

import app.dto.Response;
import app.dto.SignUpDTO;
import app.dto.UpdatePasswordDTO;
import app.dto.UserDTO;
import app.entity.User;
import app.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/user-service")
public class UserController {
    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Response deleteUser(@PathVariable String id){
        return userService.deleteUser(UUID.fromString(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserDTO updateUser(@PathVariable int id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @PostMapping("/signup")
    public ResponseEntity<Response> createUser(@RequestBody SignUpDTO sign) {
        return userService.createUser(sign);
    }

    @GetMapping("/check-name/{name}")
    public ResponseEntity<Response> checkNameExists(@PathVariable String name) {
        return userService.checkNameExists(name);
    }

    @GetMapping("/find-by-name/{name}")
    public ResponseEntity<UserDTO> findByName(@PathVariable String name) {
        return userService.findByName(name);
    }

    @PutMapping("/update-password")
    public ResponseEntity<Response> updatePassword(@RequestBody UpdatePasswordDTO updatePasswordDTO) {
        return userService.updatePassword(updatePasswordDTO);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Response> login(@RequestBody SignUpDTO userLoginDTO) {
        return ResponseEntity.ok(userService.login(userLoginDTO));
    }

    @GetMapping("/logout")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Response logout(){
        return userService.logout();
    }
}
