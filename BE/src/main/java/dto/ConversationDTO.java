package dto;

import entity.User;
import entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {
    public UUID id;
    public List<Message> messages;
    public List<User> users;
}
