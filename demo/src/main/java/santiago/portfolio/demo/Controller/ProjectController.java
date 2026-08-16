package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectResponseDto> postProject(@RequestPart ProjectPostDto projectPostDto,
            @RequestPart MultipartFile image) {
        ProjectResponseDto project = projectService.createProject(projectPostDto, image);
        return ResponseEntity.ok(project);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectResponseDto> putProject(@PathVariable Long id,
            @RequestPart ProjectPutDto projectPutDto, @RequestPart(required = false) MultipartFile image) {
        ProjectResponseDto project = projectService.putProject(id, projectPutDto, image);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProject(@RequestParam Long Id) {
        projectService.removeProject(Id);
        return ResponseEntity.noContent().build();
    }

}
