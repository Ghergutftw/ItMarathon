package app.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdatePasswordDTO {
    private String name;
    private String newPassword;

    public UpdatePasswordDTO(String name, String newPassword) {
        this.name = name;
        this.newPassword = newPassword;
    }

}
