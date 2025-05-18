package app.dto;

import app.entity.Conversation;
import app.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    public UUID id;
    public byte[] imageData;
    public String status;
    public User fromUser;
    public Conversation toConversation;
    public Boolean report;
}
