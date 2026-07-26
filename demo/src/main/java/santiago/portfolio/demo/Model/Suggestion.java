package santiago.portfolio.demo.Model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import santiago.portfolio.demo.Enum.StatusMessage;

@Entity
@Table(name = "Sugerencias")
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String cellphoneNumber;

    @Column(nullable = true)
    private String mail;

    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    private StatusMessage status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Suggestion() {
    }

    public Suggestion(String name, String cellphoneNumber, String mail, String message, StatusMessage status) {
        this.name = name;
        this.cellphoneNumber = cellphoneNumber;
        this.mail = mail;
        this.message = message;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCellphoneNumber() {
        return cellphoneNumber;
    }

    public void setCellphoneNumber(String cellphoneNumber) {
        this.cellphoneNumber = cellphoneNumber;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public StatusMessage getStatus() {
        return status;
    }

    public void setStatus(StatusMessage status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    

}
