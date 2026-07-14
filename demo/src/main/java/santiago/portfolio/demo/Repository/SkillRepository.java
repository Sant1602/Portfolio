package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    
}
