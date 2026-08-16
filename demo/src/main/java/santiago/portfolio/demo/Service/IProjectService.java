package santiago.portfolio.demo.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import santiago.portfolio.demo.Dto.Project.ProjectPostDto;
import santiago.portfolio.demo.Dto.Project.ProjectPutDto;
import santiago.portfolio.demo.Dto.Project.ProjectResponseDto;

public interface IProjectService {
    List<ProjectResponseDto> getProject();
    ProjectResponseDto createProject(ProjectPostDto projectPostDto, MultipartFile image);
    ProjectResponseDto putProject(Long id, ProjectPutDto projectPutDto, MultipartFile image);
    void removeProject(Long id);

}
