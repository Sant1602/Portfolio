package santiago.portfolio.demo.Dto.Project;

import java.util.List;

import santiago.portfolio.demo.Enum.StatusProject;

public record ProjectPostDto(
        String name,
        String description,
        String shortDescription,
        String githubFrontend,
        String githubBackend,
        List<Long> technologies,
        StatusProject statusProject,
        String demo) {
}
