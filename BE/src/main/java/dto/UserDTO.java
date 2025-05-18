package dto;

import entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    public UUID id;
    public String name;
    public String email;
    public String password;
    public String role;
    public Boolean banned;
    public Integer coins;
    public Integer messageSent;
    public Boolean premium;
    public List<User> friends;
    public User friendRequest;
}
