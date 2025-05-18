package app.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {

    private String name;
    private String email;
    private String password;
    private String phoneNumber;

}
