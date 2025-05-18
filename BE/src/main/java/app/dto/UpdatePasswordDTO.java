package app.dto;

import lombok.Getter;
import lombok.Setter;

public class UpdatePasswordDTO {
    private String name;
    private String newPassword;

    public UpdatePasswordDTO(String name, String newPassword) {
        this.name = name;
        this.newPassword = newPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
