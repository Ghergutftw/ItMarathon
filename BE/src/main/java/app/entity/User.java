package app.entity;

import app.enums.ROLES;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Getter
@Setter
@Table(name = "users")
public class User  {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String password;

    @Column(unique = true)
    private String email;

    private ROLES role;

    private Boolean banned = false;

    private Integer coins = 0;

    private Integer messageSent = 7;

    private Boolean premium = false;

    @OneToMany( fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<User> friends = new HashSet<>();

    @OneToMany( fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<User> friendRequests = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Conversation> conversations = new HashSet<>();

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ROLES getRole() {
        return role;
    }

    public void setRole(ROLES role) {
        this.role = role;
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

    public Integer getMessageSent() {
        return messageSent;
    }

    public void setMessageSent(Integer messageSent) {
        this.messageSent = messageSent;
    }

    public Boolean getPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public Set<User> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(Set<User> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public Set<Conversation> getConversations() {
        return conversations;
    }

    public void setConversations(Set<Conversation> conversations) {
        this.conversations = conversations;
    }
}
