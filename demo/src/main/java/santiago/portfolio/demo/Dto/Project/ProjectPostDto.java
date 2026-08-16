package santiago.portfolio.demo.Dto.Project;

import santiago.portfolio.demo.Enum.StatusProject;

public record ProjectPostDto(
        String name,
        String description,
        String shortDescription,
        String githubFrontend,
        String githubBackend,
        StatusProject statusProject,
        String demo) {
}
