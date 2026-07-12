package santiago.portfolio.demo.Dto.Project;

public record ProjectPostDto(
        String name,
        String description,
        String shortDescription,
        String githubFrontend,
        String githubBackend,
        String demo) {
}
