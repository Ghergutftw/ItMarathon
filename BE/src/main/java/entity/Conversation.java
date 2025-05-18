package entity;

import com.mysql.cj.protocol.Message;
import jakarta.persistence.*;
import lombok.Data;
import org.apache.catalina.User;

import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Conversation {
    @Id
    private UUID id;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Message> messages;

    @OneToMany(fetch = FetchType.EAGER)
    /*
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="USER_CONVERSATION",
            joinColumns = @JoinColumn(name="USER_ID"),
            inverseJoinColumns = @JoinColumn(name="CONVERSATION_ID")
    )*/
    private List<User> users;
}
