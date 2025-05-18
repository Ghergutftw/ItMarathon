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

    public UserDTO() {
    }

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

    public Boolean getBanned() {
        return banned;
    }

    public void setBanned(Boolean banned) {
        this.banned = banned;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }

    public Set<Conversation> getConversations() {
        return conversations;
    }

    public void setConversations(Set<Conversation> conversations) {
        this.conversations = conversations;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<UserDTO> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(Set<UserDTO> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public Set<UserDTO> getFriends() {
        return friends;
    }

    public void setFriends(Set<UserDTO> friends) {
        this.friends = friends;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMessageSent() {
        return messageSent;
    }

    public void setMessageSent(Integer messageSent) {
        this.messageSent = messageSent;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public ROLES getRole() {
        return role;
    }

    public void setRole(ROLES role) {
        this.role = role;
    }
}
