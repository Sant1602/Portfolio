package santiago.portfolio.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.Skill.SkillPostDto;
import santiago.portfolio.demo.Dto.Skill.SkillPutDto;
import santiago.portfolio.demo.Dto.Skill.SkillResponseDto;
import santiago.portfolio.demo.Model.Skill;
import santiago.portfolio.demo.Repository.SkillRepository;

@Service
public class SkillService implements ISkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public List<SkillResponseDto> getSkills() {
        return skillRepository.findAll().stream().map(SkillResponseDto::new).toList();
    }

    @Override
    public SkillResponseDto createSkill(SkillPostDto dto) {
        Skill skill = new Skill(dto.description());
        skillRepository.save(skill);
        return new SkillResponseDto(skill);
    }

    @Override
    public SkillResponseDto updateSkill(Long id, SkillPutDto dto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habilidad no encontrada"));
        dto.update(skill);
        skillRepository.save(skill);
        return new SkillResponseDto(skill);
    }

    @Override
    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habilidad no encontrada"));
        skillRepository.delete(skill);
    }

}