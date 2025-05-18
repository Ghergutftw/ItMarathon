package entity;

import enums.ROLES;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Data
public class User  {

    @Id
    private UUID id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String password;

    @Column(unique = true)
    private String email;

    private ROLES role;

    private Boolean banned;

    private Integer coins;

    private Integer messageSent;

    private Boolean premium;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<User> friends;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<User> friendRequests;

}
