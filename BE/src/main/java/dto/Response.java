package dto;

import lombok.*;

@Getter
@Setter
@Data
public class Response {

    String status;
    String message;

    public Response(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}