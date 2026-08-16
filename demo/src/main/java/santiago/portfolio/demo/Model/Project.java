package santiago.portfolio.demo.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import santiago.portfolio.demo.Enum.StatusProject;

@Entity
@Table(name = "Proyecto")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String shortDescription;

    @Column(nullable = false)
    private String githubFrontend;

    @Column(nullable = false)
    private String githubBackend;

    @Column(nullable = false)
    private String demo;

    @Enumerated(EnumType.STRING)
    private StatusProject status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Image> images = new ArrayList<>();

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Image image;

    @ManyToMany(mappedBy = "projects")
    private List<Technology> technologies = new ArrayList<>();

    public Project() {
    }

    public Project(String name, String description, String shortDescription, String githubFrontend,
            String githubBackend, String demo, StatusProject status, Image image) {
        this.name = name;
        this.description = description;
        this.shortDescription = shortDescription;
        this.githubFrontend = githubFrontend;
        this.githubBackend = githubBackend;
        this.demo = demo;
        this.status = status;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getGithubFrontend() {
        return githubFrontend;
    }

    public void setGithubFrontend(String githubFrontend) {
        this.githubFrontend = githubFrontend;
    }

    public String getGithubBackend() {
        return githubBackend;
    }

    public void setGithubBackend(String githubBackend) {
        this.githubBackend = githubBackend;
    }

    public String getDemo() {
        return demo;
    }

    public void setDemo(String demo) {
        this.demo = demo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public StatusProject getStatus() {
        return status;
    }

    public void setStatus(StatusProject status) {
        this.status = status;
    }

    public List<Technology> getTechnologies() {
        return technologies;
    }

    public void addTechnology(Technology technology) {
        if (!technologies.contains(technology)) {
            technologies.add(technology);
            technology.addProjects(this);
        }
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    

}
