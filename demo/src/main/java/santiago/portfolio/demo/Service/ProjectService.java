package santiago.portfolio.demo.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import santiago.portfolio.demo.Dto.Image.ImageDtoProject;
import santiago.portfolio.demo.Dto.Project.ProjectPostDto;
import santiago.portfolio.demo.Dto.Project.ProjectPutDto;
import santiago.portfolio.demo.Dto.Project.ProjectResponseDto;
import santiago.portfolio.demo.Enum.StatusProject;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.Image;
import santiago.portfolio.demo.Model.Project;
import santiago.portfolio.demo.Model.Technology;
import santiago.portfolio.demo.Repository.ProjectRepository;
import santiago.portfolio.demo.Repository.TechnologyRepository;

@Service
public class ProjectService implements IProjectService {

    private ProjectRepository projectRepository;
    private final IStorageService storageService;
    private final TechnologyRepository technologyRepository;

    public ProjectService(ProjectRepository projectRepository, IStorageService storageService,
            TechnologyRepository technologyRepository) {
        this.projectRepository = projectRepository;
        this.storageService = storageService;
        this.technologyRepository = technologyRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProjectResponseDto> getProject() {
        List<Project> projects = projectRepository.findAll();
        return ListMappers.toDto(projects, ProjectResponseDto::new);
    }

    @Transactional
    @Override
    public ProjectResponseDto createProject(ProjectPostDto projectPostDto, MultipartFile image) {
        List<Technology> technologies = new ArrayList<>();
        for (Long technologyId : projectPostDto.technologies()) {
            Technology technology = technologyRepository.findById(technologyId)
                    .orElseThrow(() -> new RuntimeException("No existe la tecnología ingresada"));
            technologies.add(technology);
        }
        Image img = new Image(storageService.save(image));
        Project project = new Project(projectPostDto.name(), projectPostDto.description(),
                projectPostDto.shortDescription(), projectPostDto.githubFrontend(), projectPostDto.githubBackend(),
                projectPostDto.demo(), projectPostDto.statusProject(), img);
        for (Technology tech : technologies) {
            project.addTechnology(tech);
        }
        img.setProject(project);
        return new ProjectResponseDto(projectRepository.save(project));
    }

    @Override
    public ProjectResponseDto putProject(Long id, ProjectPutDto projectPutDto, MultipartFile image) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new Error("No se encontro el proyecto"));
        projectPutDto.update(project);
        if (image != null && !image.isEmpty()) {
            ImageDtoProject url = storageService.save(image);
            project.getImage().setUrl(url.fileName());
        }
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
