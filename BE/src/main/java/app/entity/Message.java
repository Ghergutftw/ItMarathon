package app.entity;

import app.enums.ROLES;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.Instant;
import java.util.UUID;

@Entity
@Data
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "MESSAGES_SENT", nullable = false)
    private byte[] messagesSent;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private ROLES role;

    @OneToOne(fetch = FetchType.EAGER)
    private User fromUser;

    @ManyToOne(fetch = FetchType.EAGER)
    private Conversation toConversation;

    private Instant timestamp;

    @Column(name = "REPORTED", nullable = false)
    private boolean reported = false;
}
