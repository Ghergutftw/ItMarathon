package app.dto;

import app.entity.Conversation;
import app.entity.User;
import app.enums.ROLES;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
public class MessageDTO {
    public UUID id;
    public byte[] imageData;
    public String message;
    public String status;
    public User fromUser;
    public Conversation toConversation;
    public Boolean report;

    public MessageDTO(UUID id, byte[] imageData, String status, User fromUser, Conversation toConversation, Boolean report) {
        this.id = id;
        this.imageData = imageData;
        this.status = status;
        this.fromUser = fromUser;
        this.toConversation = toConversation;
        this.report = report;
    }

}
