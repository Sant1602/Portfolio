package santiago.portfolio.demo.Service;

import java.util.List;

import santiago.portfolio.demo.Dto.Project.ProjectPostDto;
import santiago.portfolio.demo.Dto.Project.ProjectPutDto;
import santiago.portfolio.demo.Dto.Project.ProjectResponseDto;

public interface IProjectService {
    List<ProjectResponseDto> getProject();
    ProjectResponseDto createProject(ProjectPostDto projectPostDto);
    ProjectResponseDto putProject(Long id, ProjectPutDto projectPutDto);
    void removeProject(Long id);

}
