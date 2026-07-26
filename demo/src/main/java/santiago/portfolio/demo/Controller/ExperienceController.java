package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import santiago.portfolio.demo.Dto.Experience.ExperiencePostDto;
import santiago.portfolio.demo.Dto.Experience.ExperiencePutDto;
import santiago.portfolio.demo.Dto.Experience.ExperienceResponseDto;
import santiago.portfolio.demo.Service.IExperienceService;

@RestController
@RequestMapping("/experience")
public class ExperienceController {

    private final IExperienceService experienceService;

    public ExperienceController(IExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponseDto>> getExperience() {
        return ResponseEntity.ok(experienceService.getExperiences());
    }

    @PostMapping
    public ResponseEntity<ExperienceResponseDto> createExperience(@RequestBody ExperiencePostDto experiencePostDto) {
        return ResponseEntity.ok(experienceService.createExperince(experiencePostDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponseDto> modifyExperience(@PathVariable Long id,
            @RequestBody ExperiencePutDto experiencePutDto) {
        return ResponseEntity.ok(experienceService.updateExperience(id, experiencePutDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteExperience(@PathVariable Long id) {
        boolean deleted = experienceService.deleteExperience(id);
        return ResponseEntity.ok(deleted);
    }
}
