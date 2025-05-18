package app.entity;

import app.enums.ROLES;
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
    private Set<User> friends = new HashSet<>();

    @OneToMany( fetch = FetchType.EAGER)
    private Set<User> friendRequests = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Conversation> conversations = new HashSet<>();
}
