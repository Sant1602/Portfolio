package santiago.portfolio.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Informacion")
public class AboutMe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 120)
    private String profession;

    @Column(nullable = false, length = 300)
    private String shortDescription;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 120)
    private String location;

    @Column(length = 255)
    private String cv;

    @Column(length = 255)
    private String github;

    @Column(length = 255)
    private String linkedin;

    @Column(nullable = false)
    private Boolean availableForWork;

    public AboutMe(){}

    public AboutMe(String name, String profession, String shortDescription, String description, String location,
            String cv, String github, String linkedin, Boolean availableForWork) {
        this.name = name;
        this.profession = profession;
        this.shortDescription = shortDescription;
        this.description = description;
        this.location = location;
        this.cv = cv;
        this.github = github;
        this.linkedin = linkedin;
        this.availableForWork = availableForWork;
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

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public Boolean getAvailableForWork() {
        return availableForWork;
    }

    public void setAvailableForWork(Boolean availableForWork) {
        this.availableForWork = availableForWork;
    }

}
