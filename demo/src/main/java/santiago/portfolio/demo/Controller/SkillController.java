package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import santiago.portfolio.demo.Dto.Skill.SkillPostDto;
import santiago.portfolio.demo.Dto.Skill.SkillPutDto;
import santiago.portfolio.demo.Dto.Skill.SkillResponseDto;
import santiago.portfolio.demo.Service.ISkillService;

@RestController
@RequestMapping("/skill")
public class SkillController {

    private final ISkillService skillService;

    public SkillController(ISkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponseDto>> getSkills() {
        return ResponseEntity.ok(skillService.getSkills());
    }

    @PostMapping
    public ResponseEntity<SkillResponseDto> postSkill(@RequestBody SkillPostDto skillPostDto) {
        SkillResponseDto skill = skillService.createSkill(skillPostDto);
        return ResponseEntity.ok(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponseDto> putSkill(@PathVariable Long id, @RequestBody SkillPutDto skillPutDto) {
        SkillResponseDto skill = skillService.updateSkill(id, skillPutDto);
        return ResponseEntity.ok(skill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

}