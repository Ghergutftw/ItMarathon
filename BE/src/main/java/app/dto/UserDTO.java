package app.dto;

import app.enums.ROLES;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private ROLES role;
    private Integer coins;
    private Boolean premium;

    public UserDTO(UUID id, String name, String email, ROLES role, Integer coins, Boolean premium) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.coins = coins;
        this.premium = premium;
    }
}
