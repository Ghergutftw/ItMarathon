package entity;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Conversation {
    @Id
    private UUID id;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "message")
    private List<Message> messages = new ArrayList<>();


    /*
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="USER_CONVERSATION",
            joinColumns = @JoinColumn(name="USER_ID"),
            inverseJoinColumns = @JoinColumn(name="CONVERSATION_ID")
    )*/
    @OneToMany(fetch = FetchType.EAGER)
    private List<User> users;
}
