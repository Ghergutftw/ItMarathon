package app.entity;

import app.enums.ROLES;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.Remove;
import org.hibernate.annotations.GenericGenerator;

import java.time.Instant;
import java.util.UUID;

@Getter
@Entity
@Data
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "MESSAGES_SENT", columnDefinition = "LONGBLOB", nullable = false)
    private byte[] imageData;

    @OneToOne(fetch = FetchType.EAGER)
    private User fromUser;

    @ManyToOne(fetch = FetchType.EAGER)
    private Conversation toConversation;

    private Instant timestamp;

    @Column(name = "REPORTED", nullable = false)
    private boolean reported = false;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public Conversation getToConversation() {
        return toConversation;
    }

    public void setToConversation(Conversation toConversation) {
        this.toConversation = toConversation;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isReported() {
        return reported;
    }

    public void setReported(boolean reported) {
        this.reported = reported;
    }
}
