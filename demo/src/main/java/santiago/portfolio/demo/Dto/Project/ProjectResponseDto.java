package santiago.portfolio.demo.Dto.Project;

import java.time.LocalDateTime;
import java.util.List;

import santiago.portfolio.demo.Dto.Image.ImageDtoResponse;
import santiago.portfolio.demo.Dto.Technology.TechnologyResponseDto;
import santiago.portfolio.demo.Enum.StatusProject;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.Project;
import santiago.portfolio.demo.Model.Technology;

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
        List<TechnologyResponseDto> technologies,
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
                ListMappers.toDto(project.getTechnologies(), TechnologyResponseDto::new),
                project.getImage().getUrl()
        );
    }
    
}
