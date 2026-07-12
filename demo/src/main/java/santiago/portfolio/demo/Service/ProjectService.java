package santiago.portfolio.demo.Service;

import java.util.List;
import org.springframework.stereotype.Service;
import santiago.portfolio.demo.Dto.Project.ProjectPostDto;
import santiago.portfolio.demo.Dto.Project.ProjectPutDto;
import santiago.portfolio.demo.Dto.Project.ProjectResponseDto;
import santiago.portfolio.demo.Enum.StatusProject;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.Project;
import santiago.portfolio.demo.Repository.ProjectRepository;

@Service
public class ProjectService implements IProjectService {

    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<ProjectResponseDto> getProject() {
        List<Project> projects = projectRepository.findAll();
        return ListMappers.toDto(projects, ProjectResponseDto::new);
    }

    @Override
    public ProjectResponseDto createProject(ProjectPostDto projectPostDto) {
        Project project = new Project(projectPostDto.name(), projectPostDto.description(),
                projectPostDto.shortDescription(), projectPostDto.githubFrontend(), projectPostDto.githubBackend(),
                projectPostDto.demo(), StatusProject.Publicado);
        return new ProjectResponseDto(projectRepository.save(project));
    }

    @Override
    public ProjectResponseDto putProject(Long id, ProjectPutDto projectPutDto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new Error("No se encontro el proyecto"));
        projectPutDto.update(project);
        projectRepository.save(project);
        return new ProjectResponseDto(project);
    }

    @Override
    public void removeProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new Error("No se encontro el proyecto"));
        projectRepository.delete(project);
    }
}
