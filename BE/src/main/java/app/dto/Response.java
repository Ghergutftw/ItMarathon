package app.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private String status;
    private String message;

    public Response() {
    }

    public Response(String status, String message) {
        this.status = status;
        this.message = message;
    }

}