package app.dto;

import app.entity.Conversation;
import app.enums.ROLES;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class UserDTO {
    private UUID id;
    private String name;
    private String password;
    private String email;
    private ROLES role;
    private Boolean banned;
    private Integer messageSent;
    private Set<UserDTO> friends;
    private Set<UserDTO> friendRequests;
    private Set<Conversation> conversations;
    private Integer coins;
    private Boolean premium;

    public UserDTO(
            UUID id,
            String name,
            String password,
            String email,
            ROLES role,
            Boolean banned,
            Integer messageSent,
            Set<UserDTO> friends,
            Set<UserDTO> friendRequests,
            Set<Conversation> conversations,
            Integer coins,
            Boolean premium
    ) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.banned = banned;
        this.messageSent = messageSent;
        this.friends = friends;
        this.friendRequests = friendRequests;
        this.conversations = conversations;
        this.coins = coins;
        this.premium = premium;
    }
}
