package entity;

import enums.ROLES;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "MESSAGES", nullable = false)
    private byte[] messages;

    @Column(name = "STATUS", nullable = false)
    private ROLES status;

    @OneToOne(fetch = FetchType.EAGER)
    private User fromUser;

    @ManyToOne(fetch = FetchType.EAGER)
    private Conversation toConversation;

    @Column(name = "REPORTED", nullable = false)
    private boolean reported = false;
}
