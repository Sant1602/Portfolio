package santiago.portfolio.demo.Dto.Project;

import java.time.LocalDateTime;
import java.util.List;

import santiago.portfolio.demo.Dto.Image.ImageDtoResponse;
import santiago.portfolio.demo.Enum.StatusProject;
import santiago.portfolio.demo.Model.Project;

public record ProjectResponseDto(
        Long id,
        String name,
        String description,
        String shortDescription,
        String githubFrontend,
        String githubBackend,
        String demo,
        StatusProject statusProject,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String image) {

    public ProjectResponseDto(Project project) {
        this(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getShortDescription(),
                project.getGithubFrontend(),
                project.getGithubBackend(),
                project.getDemo(),
                project.getStatus(),
                project.getCreatedAt(),
                project.getUpdatedAt(),
                project.getImage().getUrl()
        );
    }
    
}
