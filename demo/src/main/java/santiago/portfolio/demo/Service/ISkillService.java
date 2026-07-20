package santiago.portfolio.demo.Service;

import java.util.List;

import santiago.portfolio.demo.Dto.Skill.SkillPostDto;
import santiago.portfolio.demo.Dto.Skill.SkillPutDto;
import santiago.portfolio.demo.Dto.Skill.SkillResponseDto;

public interface ISkillService {

    List<SkillResponseDto> getSkills();
    SkillResponseDto createSkill(SkillPostDto skillPostDto);
    SkillResponseDto updateSkill(Long id, SkillPutDto skillPutDto);
    void deleteSkill(Long id);

}
