package santiago.portfolio.demo.Dto.Skill;

import santiago.portfolio.demo.Model.Skill;

public record SkillResponseDto(Long id, String description) {
    public SkillResponseDto(Skill skill){
        this(skill.getId(), skill.getDescription());
    }
    
}
