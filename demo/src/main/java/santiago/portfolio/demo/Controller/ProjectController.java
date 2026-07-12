package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import santiago.portfolio.demo.Dto.Project.ProjectPostDto;
import santiago.portfolio.demo.Dto.Project.ProjectPutDto;
import santiago.portfolio.demo.Dto.Project.ProjectResponseDto;
import santiago.portfolio.demo.Service.IProjectService;

@RestController
@RequestMapping("/project")
public class ProjectController {
    private final IProjectService projectService;

    public ProjectController(IProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDto>> getProject() {
        return ResponseEntity.ok(projectService.getProject());
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDto> postProject(@RequestBody ProjectPostDto projectPostDto) {
        ProjectResponseDto project = projectService.createProject(projectPostDto);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDto> putProject(@RequestParam Long Id,
            @RequestBody ProjectPutDto projectPutDto) {
        ProjectResponseDto project = projectService.putProject(Id, projectPutDto);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProject(@RequestParam Long Id) {
        projectService.removeProject(Id);
        return ResponseEntity.noContent().build();
    }

}
