package santiago.portfolio.demo.Dto.Skill;

import santiago.portfolio.demo.Model.Skill;

public record SkillPutDto(String description) {
    public void update(Skill skill){
        skill.setDescription(this.description);
    }
    
}
