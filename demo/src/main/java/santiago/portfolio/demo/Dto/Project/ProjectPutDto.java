package santiago.portfolio.demo.Dto.Project;

import santiago.portfolio.demo.Enum.StatusProject;
import santiago.portfolio.demo.Model.Project;

public record ProjectPutDto(

        String name,
        String description,
        String shortDescription,
        String githubFrontend,
        String githubBackend,
        String demo,
        StatusProject statusProject

) {

    public void update(Project project) {

        project.setName(this.name);
        project.setDescription(this.description);
        project.setShortDescription(this.shortDescription);
        project.setGithubFrontend(this.githubFrontend);
        project.setGithubBackend(this.githubBackend);
        project.setDemo(this.demo);
        project.setStatus(this.statusProject);

    }

}